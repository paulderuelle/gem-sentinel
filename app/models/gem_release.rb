class GemRelease < ApplicationRecord
  belongs_to :master_gem
  has_many :project_gems
end
