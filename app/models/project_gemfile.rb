class ProjectGemfile < ApplicationRecord
  belongs_to :project
  has_many :project_gems, dependent: :destroy
  has_many :master_gems, through: :project_gems

  validates :content, presence: true
end
