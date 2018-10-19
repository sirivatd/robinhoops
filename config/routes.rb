Rails.application.routes.draw do

  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :index] do
      resources :orders, only: [:create, :index, :show, :update]
      resources :athletes, only: [:show]
      resources :users_port_snapshots, only: [:index, :create]
      resources :watchlist_items, only: [:index, :create, :destroy]
    end
    resource :session, only: [:create, :destroy, :show]
    resources :stocks, only: [:index, :show]
    resources :athletes, only: [:show, :index]  do
      resources :tweets, only: [:index]
      resources :tweet_score_snapshots, only: [:index]
      resources :athlete_price_snapshots, only: [:index]

    end
  end
end
