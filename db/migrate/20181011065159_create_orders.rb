class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.string :type
      t.integer :num_share
      t.string :user_id, null: false
      t.string :stock_id, null: false
      t.date :purchase_date
      t.float :purchase_price
      t.float :total_return
      t.float :today_return
      t.float :equity

      t.timestamps
    end
  end
end
