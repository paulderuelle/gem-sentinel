class Api::V1::ProjectGemfilesController < ApplicationController
  def show
    gemfile = ProjectGemfile.find(params[:id])
    render json: { gemfile_id: gemfile.id, project_id: gemfile.project_id }
  end
end
