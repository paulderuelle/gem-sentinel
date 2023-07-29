class ProjectsController < ApplicationController
    before_action :redirect_unlogged_users
    def index

    end

    private

    def redirect_unlogged_users
        redirect_to new_user_session_path unless user_signed_in?
    end
end
