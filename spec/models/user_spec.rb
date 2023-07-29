require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it 'should create a valid user' do
      user = User.new(username: 'test', password: 'test123', email: 'test@test.com').save
      expect(user).to eq(true)
    end
    it 'should not create a user without a username' do
      user = User.new(password: 'test123', email: 'test@test.com').save
      expect(user).to eq(false)
    end
    it 'should not create a user without a paswword' do
      user = User.new(username: 'test', email: 'test@test.com').save
      expect(user).to eq(false)
    end
    it 'should not create a user without a mail' do
      user = User.new(username: 'test', password: 'test123').save
      expect(user).to eq(false)
    end
  end
  describe 'Uniqueness' do
    it 'should not create a user with a duplicate username' do
      User.create(username: 'test', password: 'test123', email: 'test@test.com')
      user2 = User.new(username: 'test', password: 'test123', email: 'test2@test.com')
      expect(user2.valid?).to eq(false)
      expect(user2.errors.full_messages).to include("Username has already been taken")
    end
    it 'should not create a user with a duplicate mail' do
      User.create(username: 'test', password: 'test123', email: 'test@test.com')
      user2 = User.new(username: 'test2', password: 'test123', email: 'test@test.com')
      expect(user2.valid?).to eq(false)
      expect(user2.errors.full_messages).to include("Email has already been taken")
    end
  end
  describe 'Associations' do
    it 'should have many projects' do
      user = User.reflect_on_association(:projects)
      expect(user.macro).to eq(:has_many)
    end
    it 'should have many project_gemfiles' do
      user = User.reflect_on_association(:project_gemfiles)
      expect(user.macro).to eq(:has_many)
    end
    it 'should have many project_gems' do
      user = User.reflect_on_association(:project_gems)
      expect(user.macro).to eq(:has_many)
    end
  end
end
