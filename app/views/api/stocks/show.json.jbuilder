json.set! @stock.id do
json.extract! @stock, :id, :athlete_id, :current_price, :initial_price
end
