require 'open-uri'
require 'json'
require 'parallel'

def feed_first_time(gems)
  db_data = Hash.new(nil)
  counter_gems = 0
  counter_changelog = 0
  counter_documentation = 0
  counter_nil = 0
  changelog_url = nil
  documentation_url = nil

  gems.each do |gem_name, gem_info|
    counter_gems += 1
    name = gem_name
    puts name
    changelog_url = nil
    documentation_url = nil
    gem_url = "https://rubygems.org/api/v1/gems/#{name}.json"
    pages = JSON.parse(URI.open("#{gem_url}").read)
    if pages['changelog_uri']
      changelog_url = pages['changelog_uri']
      counter_changelog += 1
      documentation_url = nil
    elsif pages['documentation_uri']
      documentation_url = pages['documentation_uri']
      counter_documentation += 1
      changelog_url = nil
    else
      counter_nil += 1
      puts "No changelog or documentation for #{name}"
      next
    end
    db_data[name] = {
      version: pages['version'],
      changelog_url: changelog_url,
      documentation_url: documentation_url
    }
  end
  puts "Total gems: #{counter_gems}"
  puts "Total changelog: #{counter_changelog}"
  puts "Total documentation: #{counter_documentation}"
  puts "Total nil: #{counter_nil}"
  db_data
end

gems = MasterGem.pluck(:name)[1000..1500]
db_data = feed_first_time(gems)
db_data.each do |name, info|
  master_gem = MasterGem.find_by(name: name)
  puts master_gem
  gem_release = GemRelease.find_by(master_gem_id: master_gem.id)
  gem_release.update(version: info[:version], changelog_page_url: info[:changelog_url], documentation_page_url: info[:documentation_url])
  gem_release.save!
end
