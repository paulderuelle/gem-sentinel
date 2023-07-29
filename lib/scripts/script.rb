
def create_gem_release(version, changelog_page_url, master_gem_id)
    gem_release = GemRelease.new(version: version, changelog_page_url: changelog_page_url, master_gem_id: master_gem_id)
    if gem_release.save
        puts "Realease created successfully!"
    else
        puts "Error during the creation of the release : #{gem_release.errors.full_messages.join(', ')}"
    end
end
MasterGem.create!(name: 'gem_exemple', rubygems_page_url: 'https://gemexemple.com')
create_gem_release('1.0.5', 'https://exemple.com', MasterGem.last.id)
