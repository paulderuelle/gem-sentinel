class Api::V1::ProjectsController < ApplicationController
  def index
    projects = Project.all
    render json: add_status_to_projects(projects)
  end

  def create
    project = Project.new(project_params)

    if project.save
      render json: project, status: :created
    else
      render json: project.errors, status: :unprocessable_entity
    end
  end

  def show
    project = Project.find(params[:id])
    project_gemfile = project.project_gemfile
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

  def project_params
    params.require(:project).permit(:name)
  end

  def add_status_to_projects(projects)
    final_projects = []
    projects.each do |project|
      final_projects << {
        name: project.name,
        id: project.id,
        status: check_status_of_project_gems(project).positive? ? 'Updatable' : 'Up to date'
      }
    end
    final_projects
  end

  def check_status_of_project_gems(project)
    updatable_gems = 0
    gems = project.project_gemfile.project_gems
    gems.each do |gem|
      master_gem_version = gem.master_gem.gem_releases.order(created_at: :desc).first.version
      project_gem_version = gem.gem_release.version
      master_gem_version == project_gem_version ? nil : updatable_gems += 1
    end
    updatable_gems
  end

  def get_gem_status(project_gem)
    master_gem_version = get_master_gem_gem_release(project_gem).version
    project_gem_version = project_gem.gem_release.version
    master_gem_version == project_gem_version ? 'Up to date' : 'Updatable'
  end

  def get_master_gem_gem_release(project_gem)
    project_gem.master_gem.gem_releases.order(created_at: :desc).first
  end
end
