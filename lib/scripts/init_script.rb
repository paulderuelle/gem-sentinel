require 'uri'
require 'net/http'

# gemlist is where we stock the return of 'gem list --remote'
gemlist_path = File.join(__dir__, 'gemlist.txt')

# Method to extract name and version from a line
def extract_gem_info(line)
    name, version = line.match(/^(.+?) \((.+?)\)$/)&.captures
    { name: name, version: version }
end

# Persist gem and create the first gem_release
def saveGemsIntoDb(gem)
    rubygems_page_url = "https://rubygems.org/gems/#{gem[:name]}"
    masterGem = MasterGem.create!(name: gem[:name], rubygems_page_url: rubygems_page_url)
    GemRelease.create!(version: gem[:version], master_gem_id: masterGem.id)
end

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
