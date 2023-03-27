Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :teams 
      resources :projects
    end
  end
  
  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
  get '/member-data', to: 'members#show'
  post '/users/create', to: 'admin#create_user'
  put '/users/update/:id', to: 'admin#update_user'
end