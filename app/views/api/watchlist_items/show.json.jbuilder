json.set! @item.id do
json.extract! @item, :id, :user_id, :stock_id
end