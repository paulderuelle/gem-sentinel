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

  def show
    project_gem = ProjectGem.find(params[:id])

    data_to_display_in_project_gem_show = {
      name: project_gem.master_gem.name,
      reference_version: get_master_gem_gem_release(project_gem).version,
      current_version: project_gem.gem_release.version,
      changelog_page_url: get_master_gem_gem_release(project_gem).changelog_page_url,
      documentation_page_url: get_master_gem_gem_release(project_gem).documentation_page_url
    }

    render json: data_to_display_in_project_gem_show
  end

  private

  def get_gem_status(project_gem)
    master_gem_version = get_master_gem_gem_release(project_gem).version
    project_gem_version = project_gem.gem_release.version
    master_gem_version == project_gem_version ? 'Up to date' : 'Updatable'
  end

  def get_master_gem_gem_release(project_gem)
    project_gem.master_gem.gem_releases.order(created_at: :desc).first
  end
end
