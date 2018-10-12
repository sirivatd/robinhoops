class Api::OrdersController < ApplicationController
    def show
        @order = Order.find(params[:id])
    end

    def index
        id = params[:user_id]
        @orders = Order.all.select {|m| m.user_id == id}
    end

    def create
        @order = Order.new(order_params)
        if @order.save!
            render "api/orders/show"
        
        else
        render json: @order.errors.full_messages, status: 422

        end
    end

    private

    def order_params
        params.require(:order).permit(:order_type, :num_share, :user_id, :stock_id, :purchase_date, :purchase_price)
    end

end