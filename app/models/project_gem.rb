class ProjectGem < ApplicationRecord
  belongs_to :project_gemfile
  belongs_to :master_gem
  belongs_to :gem_release
end
