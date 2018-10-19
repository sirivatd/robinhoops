class Api::WatchlistItemsController < ApplicationController 

    def index
        @watchlist_items = WatchlistItem.where(user_id: params[:user_id])
    end

    def create
        @item = WatchlistItem.new(watchlist_item_params)
        if @item.save
            render "api/watchlist_items/show"
        else
            render ["Error creating watchlist item"]
        end
    end

    def destroy
        @item = WatchlistItem.find(params[:id])
        if @item.delete
            render "api/watchlist_items/show"
        else
            render ["Problem deleting watchlist item"]
        end
    end

    private

    def watchlist_item_params 
        params.require(:watchlist_item).permit(:user_id, :stock_id)
    end

end