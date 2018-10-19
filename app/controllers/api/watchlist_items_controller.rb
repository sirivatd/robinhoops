class Api::WatchlistItemsController < ApplicationController 

    def index
        @watchlist_items = WatchlistItem.where(user_id: params[:user_id])
    end

end