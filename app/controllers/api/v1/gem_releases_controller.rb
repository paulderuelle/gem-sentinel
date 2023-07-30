class Api::V1::GemReleasesController < ApplicationController
  def show
    gem_release = GemRelease.find(params[:id])
    render json: gem_release
  end
end
