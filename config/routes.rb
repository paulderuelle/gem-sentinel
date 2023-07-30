Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  namespace :api do
    namespace :v1 do
      resources :project_gems, only: %i[show]
      resources :projects, only: %i[index show create]
    end
  end

  root 'pages#home'
end
