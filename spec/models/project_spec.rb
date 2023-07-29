require 'rails_helper'

RSpec.describe Project, type: :model do
  describe 'validations' do
    let!(:user) { User.create!(username: 'test', password: 'test123', email: 'test@test.com') }
    it 'should create a valid project' do
      project = Project.new(name: 'project1', user_id: user.id, created_at: DateTime.new(2023, 8, 29), updated_at:DateTime.new(2023, 8, 29)).save
      expect(project).to eq(true)
    end
    it 'should not create a project without a name' do
      project = Project.new(user_id: user.id, created_at: DateTime.new(2023, 8, 29), updated_at:DateTime.new(2023, 8, 29)).save
      expect(project).to eq(false)
    end
    it 'should not create a project without a user_id' do
      project = Project.new(name: 'project1', created_at: DateTime.new(2023, 8, 29), updated_at:DateTime.new(2023, 8, 29)).save
      expect(project).to eq(false)
    end
  end
  describe 'Uniqueness' do
    let!(:user) { User.create!(username: 'test', password: 'test123', email: 'test@test.com') }
    it 'should not create a project with a duplicate name' do
      Project.create(name: 'project1', user_id: user.id, created_at: DateTime.new(2023, 8, 29), updated_at:DateTime.new(2023, 8, 29))
      project2 = Project.new(name: 'project1', user_id: user.id, created_at: DateTime.new(2023, 8, 29), updated_at:DateTime.new(2023, 8, 29))
      expect(project2.valid?).to eq(false)
      expect(project2.errors.full_messages).to include("Name You already have one project with this name")
    end
  end
  describe 'Associations' do
    it 'should belong to a user' do
      project = Project.reflect_on_association(:user)
      expect(project.macro).to eq(:belongs_to)
    end
    it 'should have one project_gemfile' do
      project = Project.reflect_on_association(:project_gemfile)
      expect(project.macro).to eq(:has_one)
    end
  end
end
