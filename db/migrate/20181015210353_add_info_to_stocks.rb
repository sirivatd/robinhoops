class AddInfoToStocks < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :day_end_price, :float
    add_column :stocks, :day_start_price, :float
  end
end
