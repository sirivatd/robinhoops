# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'net/http'
require 'json'

User.destroy_all
Athlete.destroy_all
Stock.destroy_all
Order.destroy_all
Tweet.destroy_all
TweetScoreSnapshot.destroy_all
UserPortSnapshot.destroy_all
AthletePriceSnapshot.destroy_all

uri = URI("http://nba-players.herokuapp.com/players-stats/")
http = Net::HTTP.new(uri.host, uri.port)
req = Net::HTTP::Get.new(uri.path)
resp = http.request(req)

players_data = JSON.parse(resp.body)

User.create({email: "demo@demo.com", first_name: "Demo", last_name: "Demo", password: "password", buying_power: 2000})

players_data.each do |player|
    name = player["name"].split(" ")
 
        first_name = name[0]
        last_name = name[1]

        first_name.gsub!(/[^0-9A-Za-z-]/, '')
        last_name.gsub!(/[^0-9A-Za-z-]/, '')

        if(name.length > 2)
            third_name = name[2]
            third_name.gsub!(/[^0-9A-Za-z-]/, '')
            last_name = last_name + "_" + third_name
        end
      
    


    image_url = "http://nba-players.herokuapp.com/players/#{last_name}/#{first_name}"
    res = Net::HTTP.get_response(URI.parse(image_url))
    image_url = 'http://nba-players.herokuapp.com/players/barnes/harrison' if res.body == "Sorry, that player was not found. Please check the spelling."
    twitter_sentiment = 0

    Athlete.create({name: player["name"], team_acronym: player["team_acronym"], team_name: player["team_name"], games_played: player["games_played"], minutes_per_game: player["minutes_per_game"], field_goals_attempted_per_game: player["field_goals_attempted_per_game"], field_goals_made_per_game: player["field_goals_made_per_game"], field_goal_percentage: player["field_goal_percentage"], free_throw_percentage: player["free_throw_percentage"], three_point_attempted_per_game: player["three_point_attempted_per_game"], three_point_made_per_game: player["three_point_made_per_game"], three_point_percentage: player["three_point_percentage"], points_per_game: player["points_per_game"], offensive_rebounds_per_game: player["offensive_rebounds_per_game"], defensive_rebounds_per_game: player["defensive_rebounds_per_game"], rebounds_per_game: player["rebounds_per_game"], assists_per_game: player["assists_per_game"], steals_per_game: player["steals_per_game"], blocks_per_game: player["blocks_per_game"], turnovers_per_game: player["turnovers_per_game"], player_efficiency_rating: player["player_efficiency_rating"], twitter_sentiment: twitter_sentiment, image_url: image_url})
end

Athlete.all.each do |athlete|
    initial_price = Stock.calculate_value(athlete)
    Stock.create({athlete_id: athlete.id, current_price: initial_price, initial_price: initial_price, day_start_price: initial_price})
end

