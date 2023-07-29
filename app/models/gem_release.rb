class GemRelease < ApplicationRecord
  belongs_to :master_gem
  has_many :project_gems

  validates :version, presence: true, uniqueness: { scope: :master_gem_id }
end
