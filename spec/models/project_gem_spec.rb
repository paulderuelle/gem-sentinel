require 'rails_helper'

RSpec.describe ProjectGem, type: :model do
  describe 'Validations' do
    let!(:user) { User.create!(username: 'test', password: 'test123', email: 'test@test.com') }
    let!(:project) { Project.create!(name: 'project1', user_id: user.id, created_at: DateTime.new(2023, 8, 29), updated_at:DateTime.new(2023, 8, 29)) }
    let!(:project_gemfile) { ProjectGemfile.create!(project_id: project.id, content: 'gem "rails", "5.2.0"') }
    let!(:master_gem) { MasterGem.create!(name: 'rails', rubygems_page_url: 'https://rubygems.org/gems/rails', created_at: DateTime.new(2023, 8, 29), updated_at:DateTime.new(2023, 8, 29)) }
    let!(:gem_release) { GemRelease.create!(master_gem_id: master_gem.id, version: '5.2.0', changelog_page_url: 'https://rubygems.org/gems/rails/versions/5.2.0') }
    it 'should create a valid project_gem' do
      project_gem = ProjectGem.new(project_gemfile_id: project_gemfile.id, master_gem_id: master_gem.id, gem_release_id: gem_release.id).save
      expect(project_gem).to eq(true)
    end
  end
  describe 'Associations' do
    it 'should belong to a project_gemfile' do
      project_gem = ProjectGem.reflect_on_association(:project_gemfile)
      expect(project_gem.macro).to eq(:belongs_to)
    end
    it 'should belong to a master_gem' do
      project_gem = ProjectGem.reflect_on_association(:master_gem)
      expect(project_gem.macro).to eq(:belongs_to)
    end
    it 'should belong to a gem_release' do
      project_gem = ProjectGem.reflect_on_association(:gem_release)
      expect(project_gem.macro).to eq(:belongs_to)
    end
  end
end
