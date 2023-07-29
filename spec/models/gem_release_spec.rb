require 'rails_helper'

RSpec.describe GemRelease, type: :model do
  let!(:master_gem) { MasterGem.create!(name: 'test_gem', rubygems_page_url: 'https://rubygems.org/gems/test_gem') }
  describe 'validations' do
    it 'should create a valid gem_release' do
      gem_release = GemRelease.new(version: '1.2.4', changelog_page_url: 'https://rubygems.org/gems/test_gem/versions/1.2.4', master_gem_id: master_gem.id).save
      expect(gem_release).to eq(true)
    end
    it 'should not create a gem_release without a master_gem_id' do
      gem_release = GemRelease.new(version: '1.2.4', changelog_page_url: 'https://rubygems.org/gems/test_gem/versions/1.2.4').save
      expect(gem_release).to eq(false)
    end
  end
  describe 'Uniqueness' do
    let!(:master_gem) { MasterGem.create!(name: 'test_gem', rubygems_page_url: 'https://rubygems.org/gems/test_gem') }
    it 'should not create a gem_release with the same version and master_gem_id' do
      GemRelease.create(version: '1.2.4', changelog_page_url: 'https://rubygems.org/gems/test_gem/versions/1.2.4', master_gem_id: master_gem.id)
      gem_release2 = GemRelease.new(version: '1.2.4', changelog_page_url: 'https://rubygems.org/gems/test_gem/versions/1.2.4', master_gem_id: master_gem.id).save
      expect(gem_release2).to eq(false)
    end
  end
  describe 'Associations' do
    it 'should belong to a master_gem' do
      gem_release = GemRelease.reflect_on_association(:master_gem)
      expect(gem_release.macro).to eq(:belongs_to)
    end
    it 'should have many project_gems' do
      gem_release = GemRelease.reflect_on_association(:project_gems)
      expect(gem_release.macro).to eq(:has_many)
    end
  end
end
