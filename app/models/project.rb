class Project < ApplicationRecord
  belongs_to :user
  has_one :project_gemfile
end
