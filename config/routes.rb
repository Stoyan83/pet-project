Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :programming_languages
    end
  end
  
  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
  get '/member-data', to: 'members#show'
end