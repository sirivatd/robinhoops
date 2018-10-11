class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.integer :athlete_id, null: false, unique: true
      t.float :current_price
      t.float :initial_price

      t.timestamps
    end
    add_index(:stocks, :athlete_id)
  end
end
