class CreateAthletes < ActiveRecord::Migration[5.2]
  def change
    create_table :athletes do |t|
      t.string :name, null: false
      t.integer :twitter_sentiment_positive
      t.integer :twitter_sentiment_negative
      t.string :twitter_handle
      t.integer :jersey_number
      t.string :team_name
      t.string :position
      t.string :height
      t.string :weight
      t.date :birthdate
      t.string :birthplace
      t.string :highschool
      t.string :college
      t.string :image_url
      t.integer :games_played, null: false
      t.float :two_pointers_made, null: false
      t.float :two_pointer_percentage, null: false
      t.float :three_pointers_made, null: false
      t.float :three_point_percentage, null: false
      t.float :field_goal_percentage, null: false
      t.float :rebounds, null: false
      t.float :assists, null: false
      t.float :points_per_game, null: false
      t.float :turnovers, null: false
      t.float :steals, null: false
      t.float :blocks, null: false
      t.float :plus_minus_per_game, null: false
      t.string :symbol, null: false, unique: true

      t.timestamps
    end
    add_index(:athletes, :symbol)
  end
end
