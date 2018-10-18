json.set! @user_port_snapshot.id do
json.extract! @user_port_snapshot, :id, :user_id, :port_value, :created_at
end