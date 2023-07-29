class MasterGem < ApplicationRecord
    has_many :project_gems
    has_many :gem_releases

    validates :name, presence: true, uniqueness: true
    validates :rubygems_page_url, presence: true
end
