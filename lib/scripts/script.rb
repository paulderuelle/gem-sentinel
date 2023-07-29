require 'uri'
require 'net/http'

# Method to extract name, rubygems_page_url and version from a line
def extract_gem_info(line)
    name, version = line.match(/^(.+?) \((.+?)\)$/)&.captures
    { name: name, version: version }
end

# Persist gem
def saveGemsIntoDb(gem)
    masterGem = MasterGem.create!(name: gem[:name], rubygems_page_url: "https://rubygems.org/gems/#{gem[:name]}")
    GemRelease.create!(version: gem[:version], master_gem_id: masterGem.id)
end

gemlist_path = File.join(__dir__, 'gemlist.txt')

# Check if gemlist file exist
if File.exist?(gemlist_path)

    # read the content of the file and do an iteration on each line
    File.foreach(gemlist_path) do |line|
        gem_info = extract_gem_info(line.chomp)
        saveGemsIntoDb(gem_info)
    end
else
    puts "Gemlist doesn't exist."
end
