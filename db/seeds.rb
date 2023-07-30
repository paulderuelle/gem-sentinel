# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create!(username: "audreypachil", email: "test5@test.com", password:"lewagon123")

count=6
3.times do
  Project.create!(name: "project#{count}", user_id: User.last.id)
  count += 1
end

ProjectGemfile.create!(content: "gem 'faker', '~> 2.18', '>= 2.18.0'", project_id: Project.last.id)
ProjectGemfile.create!(content: "gem 'rspec-rails', '~> 5.0.0'", project_id: Project.first.id)
ProjectGemfile.create!(content: "gem 'pry', '~> 0.14.1'", project_id: Project.second.id)

ProjectGem.create!(project_gemfile_id: 1, master_gem_id: 7, gem_release_id: 1)
ProjectGem.create!(project_gemfile_id: 2, master_gem_id: 8, gem_release_id: 2)
ProjectGem.create!(project_gemfile_id: 3, master_gem_id: 9, gem_release_id: 3)
