class Api::AthletePriceSnapshotsController < ApplicationController 
    def index
        @snapshots = AthletePriceSnapshot.where(athlete_id: params[:athlete_id])
        
    end


end