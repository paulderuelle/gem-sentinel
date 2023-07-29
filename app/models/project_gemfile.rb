class ProjectGemfile < ApplicationRecord
  belongs_to :project
  has_many :project_gems
  has_many :master_gems, through: :project_gems
end
