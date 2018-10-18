# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_10_18_030032) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "athlete_price_snapshots", force: :cascade do |t|
    t.integer "athlete_id", null: false
    t.float "price", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "athletes", force: :cascade do |t|
    t.string "name", null: false
    t.string "team_acronym"
    t.string "team_name"
    t.integer "games_played"
    t.float "minutes_per_game"
    t.float "field_goals_attempted_per_game"
    t.float "field_goals_made_per_game"
    t.float "field_goal_percentage"
    t.float "free_throw_percentage"
    t.float "three_point_attempted_per_game"
    t.float "three_point_made_per_game"
    t.float "three_point_percentage"
    t.float "points_per_game"
    t.float "offensive_rebounds_per_game"
    t.float "defensive_rebounds_per_game"
    t.float "rebounds_per_game"
    t.float "assists_per_game"
    t.float "steals_per_game"
    t.float "blocks_per_game"
    t.float "turnovers_per_game"
    t.float "player_efficiency_rating"
    t.float "twitter_sentiment"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_athletes_on_name"
  end

  create_table "orders", force: :cascade do |t|
    t.string "order_type"
    t.integer "num_share"
    t.string "user_id", null: false
    t.string "stock_id", null: false
    t.date "purchase_date"
    t.float "purchase_price"
    t.float "total_return"
    t.float "today_return"
    t.float "equity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stocks", force: :cascade do |t|
    t.integer "athlete_id", null: false
    t.float "current_price"
    t.float "initial_price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "day_end_price"
    t.float "day_start_price"
    t.index ["athlete_id"], name: "index_stocks_on_athlete_id"
  end

  create_table "tweet_score_snapshots", force: :cascade do |t|
    t.integer "athlete_id", null: false
    t.float "twitter_sentiment", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tweets", force: :cascade do |t|
    t.string "body"
    t.float "score"
    t.integer "athlete_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_port_snapshots", force: :cascade do |t|
    t.integer "user_id", null: false
    t.float "port_value", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "buying_power", null: false
    t.index ["email"], name: "index_users_on_email"
  end

  create_table "watchlist_items", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "stock_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
