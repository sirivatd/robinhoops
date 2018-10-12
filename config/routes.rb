Rails.application.routes.draw do

  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create] do
      resources :orders, only: [:create, :index, :show]
    end
    resource :session, only: [:create, :destroy, :show]
    resources :stocks, only: [:index, :show]
    resources :athletes, only: [:show]
  end
end
