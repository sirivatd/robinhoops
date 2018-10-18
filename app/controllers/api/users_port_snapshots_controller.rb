class Api::UsersPortSnapshotsController < ApplicationController

    def create
        @user_port_snapshot = UserPortSnapshot.new(snapshot_params)
        if @user_port_snapshot.save
            render "api/users_port_snapshots/show"
        else
            render json: @user_port_snapshot.errors.full_messages, status: 422
        end
    end

    def index
        @snapshots = UserPortSnapshot.where(user_id: params[:user_id])
    end



    private

    def snapshot_params
        params.require(:snapshot).permit(:user_id, :port_value)
    end
end