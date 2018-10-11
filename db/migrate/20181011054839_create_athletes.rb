class CreateAthletes < ActiveRecord::Migration[5.2]
  def change
    create_table :athletes do |t|
      t.string :name, null: false, unique: true
      t.string :team_acronym
      t.string :team_name
      t.integer :games_played
      t.float :minutes_per_game
      t.float :field_goals_attempted_per_game
      t.float :field_goals_made_per_game
      t.float :field_goal_percentage
      t.float :free_throw_percentage
      t.float :three_point_attempted_per_game
      t.float :three_point_made_per_game
      t.float :three_point_percentage
      t.float :points_per_game
      t.float :offensive_rebounds_per_game
      t.float :defensive_rebounds_per_game
      t.float :rebounds_per_game
      t.float :assists_per_game
      t.float :steals_per_game
      t.float :blocks_per_game
      t.float :turnovers_per_game
      t.float :player_efficiency_rating
      t.float :twitter_sentiment
      t.string :image_url

      t.timestamps
    end
    add_index(:athletes,:name)
  end
end
