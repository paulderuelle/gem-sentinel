require 'rails_helper'

RSpec.describe MasterGem, type: :model do
  describe 'validations' do
    it 'should create a valid master_gem' do
      master_gem = MasterGem.new(name: 'test_gem', rubygems_page_url: 'https://rubygems.org/gems/test_gem').save
      expect(master_gem).to eq(true)
    end
    it 'should not create a master_gem without a name' do
      master_gem = MasterGem.new(rubygems_page_url: 'https://rubygems.org/gems/test_gem').save
      expect(master_gem).to eq(false)
    end
    it 'should not create a master_gem without a rubygems_page_url' do
      master_gem = MasterGem.new(name: 'test_gem').save
      expect(master_gem).to eq(false)
    end
  end
  describe 'Uniqueness' do
    it 'should not create a master_gem with a duplicate name' do
      MasterGem.create(name: 'test_gem', rubygems_page_url: 'https://rubygems.org/gems/test_gem')
      master_gem2 = MasterGem.new(name: 'test_gem', rubygems_page_url: 'https://rubygems.org/gems/test_gem2')
      expect(master_gem2.valid?).to eq(false)
      expect(master_gem2.errors.full_messages).to include("Name has already been taken")
    end
  end
  describe 'Associations' do
    it 'should have many project_gems' do
      master_gem = MasterGem.reflect_on_association(:project_gems)
      expect(master_gem.macro).to eq(:has_many)
    end
    it 'should have many gem_releases' do
      master_gem = MasterGem.reflect_on_association(:gem_releases)
      expect(master_gem.macro).to eq(:has_many)
    end
  end
end
