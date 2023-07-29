class Api::V1::ProjectsController < ApplicationController
  before_action :redirect_unlogged_users

  def index
    @projects = Project.all
    render json: @projects
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      render json: @project, status: :created
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def show
    project = Project.find(params[:id])
    render json: { project_id: project.id, project_gemfile_id: project.project_gemfile.id }
  end

  private

  def redirect_unlogged_users
    redirect_to new_user_session_path unless user_signed_in?
  end

  def project_params
    params.require(:project).permit(:name)
  end
end
