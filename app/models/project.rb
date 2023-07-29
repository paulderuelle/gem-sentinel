class Project < ApplicationRecord
  belongs_to :user
  has_one :project_gemfile

  validates :name, presence: true, uniqueness: { scope: :user_id, case_sensitive: false, message: 'You already have one project with this name' }
end
