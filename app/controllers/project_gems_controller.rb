class ProjectGemsController < ApplicationController
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

  def get_master_gem_gem_release(project_gem)
    project_gem.master_gem.gem_releases.order(created_at: :desc).first
  end
end
