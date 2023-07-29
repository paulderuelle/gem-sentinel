Rails.application.routes.draw do
  require "sidekiq/web"

  root "projects#index"

  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }

  namespace :api do
    namespace :v1 do
      resources :projects
    end
  end
  
  
  mount Sidekiq::Web => '/sidekiq'
  root 'pages#home'
end
