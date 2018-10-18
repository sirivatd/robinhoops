class CreateUserPortSnapshots < ActiveRecord::Migration[5.2]
  def change
    create_table :user_port_snapshots do |t|
      t.integer :user_id, null: false
      t.float :port_value, null: false

      t.timestamps
    end
  end
end
