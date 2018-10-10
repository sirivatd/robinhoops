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

ActiveRecord::Schema.define(version: 2018_10_10_213039) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "athletes", force: :cascade do |t|
    t.string "name", null: false
    t.integer "twitter_sentiment_positive"
    t.integer "twitter_sentiment_negative"
    t.string "twitter_handle"
    t.integer "jersey_number"
    t.string "team_name"
    t.string "position"
    t.string "height"
    t.string "weight"
    t.date "birthdate"
    t.string "birthplace"
    t.string "highschool"
    t.string "college"
    t.string "image_url"
    t.integer "games_played", null: false
    t.float "two_pointers_made", null: false
    t.float "two_pointer_percentage", null: false
    t.float "three_pointers_made", null: false
    t.float "three_point_percentage", null: false
    t.float "field_goal_percentage", null: false
    t.float "rebounds", null: false
    t.float "assists", null: false
    t.float "points_per_game", null: false
    t.float "turnovers", null: false
    t.float "steals", null: false
    t.float "blocks", null: false
    t.float "plus_minus_per_game", null: false
    t.string "symbol", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["symbol"], name: "index_athletes_on_symbol"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email"
  end

end
