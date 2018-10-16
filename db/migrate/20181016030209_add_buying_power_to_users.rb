class AddBuyingPowerToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :buying_power, :float, null: false

  end
end
