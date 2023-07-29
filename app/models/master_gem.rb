class MasterGem < ApplicationRecord
    has_many :project_gems
    has_many :gem_releases
end
