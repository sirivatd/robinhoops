class Api::StocksController < ApplicationController
    def index
        @stocks = Stock.all
    end

    def show
        @stock = Stock.find(params[:id])
    end
end