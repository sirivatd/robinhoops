class CreateAthletePriceSnapshots < ActiveRecord::Migration[5.2]
  def change
    create_table :athlete_price_snapshots do |t|
      t.integer :athlete_id, null: false
      t.float :price, null: false

      t.timestamps
    end
  end
end
