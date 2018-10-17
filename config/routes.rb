Rails.application.routes.draw do

  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update] do
      resources :orders, only: [:create, :index, :show, :update]
      resources :athletes, only: [:show]
    end
    resource :session, only: [:create, :destroy, :show]
    resources :stocks, only: [:index, :show]
    resources :athletes, only: [:show, :index]  do
      resources :tweets, only: [:index]

    end
  end
end
