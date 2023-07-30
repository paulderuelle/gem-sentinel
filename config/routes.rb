Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }

  # Api routes
  namespace :api do
    namespace :v1 do
      resources :project_gems, only: %i[show]
      resources :projects, only: %i[index show create new update]
    end
  end
  root 'pages#home'
end
