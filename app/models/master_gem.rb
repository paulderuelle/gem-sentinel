class MasterGem < ApplicationRecord
    has_many :project_gems, dependent: :destroy
    has_many :gem_releases, dependent: :destroy

    validates :name, presence: true, uniqueness: true
    validates :rubygems_page_url, presence: true
end
