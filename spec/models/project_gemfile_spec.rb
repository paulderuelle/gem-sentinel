require 'rails_helper'

RSpec.describe ProjectGemfile, type: :model do
  describe 'Validations' do
    let!(:user) { User.create!(username: 'test', email: 'test@test.com', password: 'test123') }
    let!(:project) { Project.create!(name: 'myapp', user_id: user.id) }
    it 'should create a valid project_gemfile' do
      project_gemfile = ProjectGemfile.create!(project_id: project.id, content: 'gem "rails version: 5.2.0"')
      expect(project_gemfile).to be_valid
    end
    it 'should not create a project_gemfile without a project_id' do
      project_gemfile = ProjectGemfile.new(content: 'gem "rails version: 5.2.0"').save
      expect(project_gemfile).to eq(false)
    end
    it 'should not create a project_gemfile without content' do
      project_gemfile = ProjectGemfile.new(project_id: project.id).save
      expect(project_gemfile).to eq(false)
    end
  end
  describe 'Associations' do
    it 'should belong to a project' do
      project_gemfile = ProjectGemfile.reflect_on_association(:project)
      expect(project_gemfile.macro).to eq(:belongs_to)
    end
    it 'should have many project_gems' do
      project_gemfile = ProjectGemfile.reflect_on_association(:project_gems)
      expect(project_gemfile.macro).to eq(:has_many)
    end
    it 'should have many master_gems through project_gems' do
      project_gemfile = ProjectGemfile.reflect_on_association(:master_gems)
      expect(project_gemfile.macro).to eq(:has_many)
    end
  end
end
