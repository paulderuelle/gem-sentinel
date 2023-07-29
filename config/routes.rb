Rails.application.routes.draw do
  require "sidekiq/web"

  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }

  namespace :api do
    namespace :v1 do
      resources :projects, only: %i[index create]
    end
  end

  root 'pages#home'
end
