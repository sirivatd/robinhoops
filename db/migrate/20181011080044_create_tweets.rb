class CreateTweets < ActiveRecord::Migration[5.2]
  def change
    create_table :tweets do |t|
      t.string :body
      t.float :score
      t.integer :athlete_id, null: false

      t.timestamps
    end
  end
end
