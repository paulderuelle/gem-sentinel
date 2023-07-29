require 'rails_helper'

RSpec.describe GemRelease, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:version) }
    it { should validate_uniqueness_of(:version).scoped_to(:master_gem_id) }
  end

  describe 'associations' do
    it { should belong_to(:master_gem) }
    it { should have_many(:project_gems) }
  end
end
