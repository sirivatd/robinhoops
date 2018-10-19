class Api::TweetScoreSnapshotsController < ApplicationController 
    def index
        @scores = TweetScoreSnapshot.where(athlete_id: params[:athlete_id])
    end
end