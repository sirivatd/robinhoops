json.set! @order.stock.id do
json.extract! @order.stock, :id, :athlete_id, :current_price, :initial_price
end