class Api::V1::ProjectGemsController < ApplicationController
  def index
    project_gemfile = ProjectGemfile.find(params[:project_gemfile_id])
    project_gems = project_gemfile.project_gems

    gem_data = project_gems.map do |project_gem|
      {
        id: project_gem.id,
        name: project_gem.master_gem.name,
        status: get_gem_status(project_gem)
      }
    end

    render json: gem_data
  end

  private

  def get_gem_status(project_gem)
    gem_release = project_gem.gem_release
    master_gem_version = gem_release.master_gem.gem_releases.find_by(version: gem_release.version)
    project_gem_version = gem_release.version

    master_gem_version == project_gem_version ? 'Up to date' : 'Updatable'
  end
end
