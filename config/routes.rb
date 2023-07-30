Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  resources :project_gems, only: %i[show]
  namespace :api do
    namespace :v1 do
      resources :projects, only: %i[index show create] do
        resources :project_gemfiles, only: %i[show] do
          resources :project_gems, only: %i[index]
        end
      end
    end
  end

  root 'pages#home'
end
