require 'nokogiri'
require 'open-uri'
require 'json'
require 'parallel'


# Helper to scrap the gems releases from rubygems.org

module GemReleases
  BASE_URL = 'https://rubygems.org/releases'.freeze
  API_URL = 'https://rubygems.org/api/v1'.freeze


  def self.extract_gems_info_from_page(url)
    # This method extracts the name, version, date of last update and link to the gem page
    # from the page with the list of gems
    #
    # @param url [String] url of the page with the list of gems
    # @return [Hash] hash with gems info
    # @raise [RuntimeError] if the response is empty
    #
    # @example
    #   extract_gems_info_from_page('https://rubygems.org/gems/bundler/versions/2.0.2')
    #   # => {
    #          'bundler' => {
    #            version: '2.0.2',
    #            updated_at: '2019-02-07',
    #            gem_url: '/gems/bundler/versions/2.0.2'
    #          }
    #        }

    response = URI.parse(url).open.read

    raise "Empty response received from #{url}" if response.nil? || response.empty?

    parsed_page = Nokogiri::HTML(response).css('.gems__gem')
    gems = Hash.new(nil)
    parsed_page.each do |element|
      name = element.xpath('.//h2[@class="gems__gem__name"]/text()').text.strip
      gems[name] = {
        version: element.css('h2.gems__gem__name span:first-child').text.strip,
        updated_at: element.css('h2.gems__gem__name span:last-child').text.strip,
        gem_url: element.attributes['href'].value
      }
    end
    gems
  end

  def self.get_total_pages(base_url)
    # This method gets the total number of pages for a given base url.
    #
    # @param [String] base_url The url to get the total number of pages for.
    #
    # @return [Integer] The total number of pages for the given base url.
    #
    # @example
    #   get_total_pages('http://www.google.com') #=> 3
    #
    # @raise [RuntimeError] If the response is empty.
    response = URI.parse(base_url).open.read

    raise "Empty response received from #{base_url}" if response.nil? || response.empty?

    parsed_page = Nokogiri::HTML(response)
    last_page_link = parsed_page.css('.pagination a').last['href']
    last_page_link.scan(/\d+/).last.to_i
  end


  def self.all_gems_scraper
    # Scrape all gems from the RubyGems website.
    # Returns a hash with the gem name as the key and the gem version as the value.

    gems = {}
    total_pages = get_total_pages(BASE_URL)
    (1..total_pages).each do |page_number|
      url = "#{BASE_URL}?page=#{page_number}"
      gems_info = extract_gems_info_from_page(url)
      gems.merge!(gems_info)
    end
    gems
  end


  def self.gems_pages(gem_url)
    JSON.parse(URI.open("#{API_URL}#{gem_url}.json").read)
  end

  def self.run
    # This method runs the scraper and returns a hash with the gem name as the key and the gem version as the value.
    # @example :
    #   run
    #   # => {
    #          'bundler' => {
    #            version: '2.0.2',
    #            gem_url: '/gems/bundler/versions/2.0.2',
    #            changelog_url: 'https://github.com/rubygems/rubygems/blob/master/bundler/CHANGELOG.md'
    #          }
    #        }
    # if not changelog_url, then documentation_url

    base_url = 'https://rubygems.org'.freeze
    db_data = Hash.new(nil)
    counter_gems = 0
    counter_changelog = 0
    counter_documentation = 0
    counter_nil = 0
    gems = all_gems_scraper
    Parallel.each(gems, in_threads: 4) do |gem_name, gem_info|
      counter_gems += 1
      name = gem_name
      version = gem_info[:version]
      gem_url = "#{base_url}#{gem_info[:gem_url]}"
      pages = gems_pages(gem_info[:gem_url])
      if pages['changelog_uri']
        changelog_url = pages['changelog_uri']
        counter_changelog += 1
      elsif pages['documentation_uri']
        changelog_url = pages['documentation_uri']
        counter_documentation += 1
      else
        counter_nil += 1
        changelog_url = nil
        puts "No changelog or documentation for #{name}"
        next
      end
      db_data[name] = {
        version: version,
        gem_url: gem_url,
        changelog_url: changelog_url
      }
    end

    puts "Total gems: #{counter_gems}"
    puts "Total changelog: #{counter_changelog}"
    puts "Total documentation: #{counter_documentation}"
    puts "Total nil: #{counter_nil}"
    db_data
  end

  def self.feed_first_time(gems)
    db_data = Hash.new(nil)
    counter_gems = 0
    counter_changelog = 0
    counter_documentation = 0
    counter_nil = 0
    Parallel.each(gems, in_threads: 4) do |gem_name, gem_info|
      counter_gems += 1
      name = gem_name
      gem_url = "https://rubygems.org/api/v1/gems/#{name}.json"
      pages = JSON.parse(URI.open("#{gem_url}").read)
      if pages['changelog_uri']
        changelog_url = pages['changelog_uri']
        counter_changelog += 1
      elsif pages['documentation_uri']
        changelog_url = pages['documentation_uri']
        counter_documentation += 1
      else
        counter_nil += 1
        changelog_url = nil
        puts "No changelog or documentation for #{name}"
        next
      end
      db_data[name] = {
        version: pages['version'],
        changelog_url: changelog_url
      }
    end
    puts "Total gems: #{counter_gems}"
    puts "Total changelog: #{counter_changelog}"
    puts "Total documentation: #{counter_documentation}"
    puts "Total nil: #{counter_nil}"
    db_data
  end

  private_class_method :extract_gems_info_from_page, :get_total_pages, :gems_pages, :all_gems_scraper
end

gems = MasterGem.pluck(:name)
puts gems
puts GemReleases.feed_first_time(gems)
