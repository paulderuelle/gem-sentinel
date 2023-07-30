puts 'destroying any previous data...'
ProjectGem.destroy_all
ProjectGemfile.destroy_all
Project.destroy_all
User.destroy_all

puts 'generating users...'
users = User.create!([{ username: 'user1', email: 'user1@example.com', password: 'password' },
                      { username: 'user2', email: 'user2@example.com', password: 'password' },
                      { username: 'user3', email: 'user3@example.com', password: 'password' },
                      { username: 'user4', email: 'user4@example.com', password: 'password' },
                      { username: 'user5', email: 'user5@example.com', password: 'password' }
                      ])

puts 'generating gems...'
master_gems_with_releases = (1..20).map do |i|
  master_gem = MasterGem.create!(name: "MasterGem #{i}", rubygems_page_url: "https://rubygems.org/gems/gem#{i}")
  gem_release = GemRelease.create!(version: "1.0.#{i}", changelog_page_url: "https://example.com/changelog/#{i}", master_gem: master_gem)
  { master_gem: master_gem, gem_release: gem_release }
end

puts 'generating projects...'
users.each do |user|
  5.times do |i|
    project = Project.create!(name: "Project #{i + 1}", user: user)


    # Création d'un project_gemfile pour chaque projet
    project_gemfile = ProjectGemfile.create!(content: "Content of Project Gemfile #{i + 1}", project: project)


    # Création de 5 project_gems pour chaque project_gemfile en associant les master_gems et gem_releases aléatoirement
    5.times do
      random_master_gem_release = master_gems_with_releases.sample
      ProjectGem.create!(
        project_gemfile: project_gemfile,
        master_gem: random_master_gem_release[:master_gem],
        gem_release: random_master_gem_release[:gem_release]
      )
    end
  end
end


puts 'seeded succesfully!'

