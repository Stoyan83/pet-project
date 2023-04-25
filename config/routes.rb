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
          patch :update_tasks
        end
      end
    end
  end

  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
  devise_scope :user do
    put '/users/profile_change', to: 'users/passwords#change_password'
  end

  get '/member-data', to: 'members#show'
  get '/user/avatar', to: 'members#avatar'
  get '/users', to: 'admin#index'
  post '/users/create', to: 'admin#create_user'
end
