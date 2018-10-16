class Api::AthletesController < ApplicationController 
    def show
        @athlete = Athlete.find(params[:id])
    end

    def index
        @athletes = Athlete.all
    end
end