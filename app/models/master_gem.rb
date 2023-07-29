class MasterGem < ApplicationRecord
<<<<<<< HEAD
  has_many :project_gems
  has_many :gem_releases
=======
    has_many :project_gems, dependent: :destroy
    has_many :gem_releases, dependent: :destroy
>>>>>>> master

  validates :name, presence: true, uniqueness: true
  validates :rubygems_page_url, presence: true
end
