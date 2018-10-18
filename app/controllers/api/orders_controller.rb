class Api::OrdersController < ApplicationController
    def show
        @order = Order.find(params[:id])
        @stock = @order.stock
        render "api/orders/show_order"
    end

    def index
        id = params[:user_id]
        @orders = Order.all.select {|m| m.user_id == id}
    end

    def update
        @order = Order.find(params[:id])
        sentimentScore = Tweet.scrape_tweeter(@order.athlete.name)
        @tweet_snapshot = TweetScoreSnapshot.create(athlete_id: @order.athlete.id, twitter_sentiment: sentimentScore)
        scoreImpact = 0
        if sentimentScore < 1
            scoreImpact =  -0.05
        elsif sentimentScore < 0
            scoreImpact = -0.01
        elsif sentimentScore > 1
            scoreImpact = 0.05
        elsif sentimentScore > 0
            scoreImpact = 0.10
        end
        if scoreImpact + @order.stock.current_price < @order.stock.initial_price/2
            @order.stock.update(current_price: @order.stock.initial_price * 0.5 + 0.25)
        else
        @order.stock.update(current_price: @order.stock.current_price + scoreImpact)
        @stock = @order.stock
        end
        @athlete_price_snapshot = AthletePriceSnapshot.create(athlete_id: @order.athlete.id, price: @order.stock.current_price)

        render "api/orders/show"
    end

    def create
        @order = Order.new(order_params)
        if @order.save!
            render "api/orders/show_order"
        
        else
        render json: @order.errors.full_messages, status: 422

        end
    end

    private

    def order_params
        params.require(:order).permit(:order_type, :num_share, :user_id, :stock_id, :purchase_date, :purchase_price)
    end

end