@watchlist_items.each do |item|
json.set! item.id do
json.extract! item, :id, :user_id, :stock_id
end
end 