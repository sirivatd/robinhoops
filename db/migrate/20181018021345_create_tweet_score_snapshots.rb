class CreateTweetScoreSnapshots < ActiveRecord::Migration[5.2]
  def change
    create_table :tweet_score_snapshots do |t|
      t.integer :athlete_id, null: false
      t.float :twitter_sentiment, null: false
      t.timestamps
    end
  end
end
