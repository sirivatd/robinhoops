@snapshots.each do |snapshot|
json.set! snapshot.id do
json.extract! snapshot, :id, :port_value, :created_at
end

end