class Api::TweetsController < ApplicationController

    def index
        @athlete = Athlete.find(params[:athlete_id])
        @tweets = Tweet.find_tweets(@athlete.name)
    end

end