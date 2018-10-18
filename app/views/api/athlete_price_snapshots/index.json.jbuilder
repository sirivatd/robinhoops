@snapshots.each do |snapshot|
json.set! snapshot.id do
json.extract! snapshot, :id, :price, :created_at
end
end