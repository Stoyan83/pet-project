# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :teams
      resources :projects do
        resources :lists
        member do
          get :project_tasks, to: 'tasks#project_tasks'
        end
      end
      resources :lists
      resources :tasks do
        collection do
          get :assigned
          get :creator
          get :team_tasks
        end
      end
    end
  end

  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }

  get '/member-data', to: 'members#show'
  get '/member-data', to: 'members#show'
  get '/users', to: 'admin#index'
  post '/users/create', to: 'admin#create_user'
  put '/users/update/:id', to: 'admin#update_user'
end
