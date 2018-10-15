class Stock < ApplicationRecord
    belongs_to :athlete
    has_many :orders

    def self.update_price(stock)
            randomNumber = rand(-5...5)

            stock.update(current_price: stock.current_price + (randomNumber * (0.5)))

        
    end

    def self.calculate_value(athlete) 
        games_played_score = athlete.games_played * 100000
        minutes_per_game_score = athlete.minutes_per_game * 50000
        field_goals_made_per_game_score = athlete.field_goals_made_per_game * 1000000
        field_goal_percentage_score = (athlete.field_goal_percentage * 50000000)/100
        free_throw_percentage_score = (athlete.free_throw_percentage * 5000000)/100
        three_point_made_per_game_score = athlete.three_point_made_per_game * 250000
        three_point_percentage_score = (athlete.three_point_percentage * 50000000)/100
        points_per_game_score = athlete.points_per_game * 200000
        rebounds_per_game_score = athlete.rebounds_per_game * 170000
        assists_per_game_score = athlete.assists_per_game * 170000
        steals_per_game_score = athlete.steals_per_game * 400000
        blocks_per_game_score = athlete.blocks_per_game * 400000
        turnovers_per_game_score = athlete.turnovers_per_game * 500000
        player_efficiency_rating_score = (athlete.player_efficiency_rating * 75000000)/100 
        twitter_sentiment_score = athlete.twitter_sentiment * 15000000

        total_value = games_played_score + minutes_per_game_score + field_goal_percentage_score + field_goals_made_per_game_score + field_goal_percentage_score + free_throw_percentage_score + three_point_made_per_game_score + three_point_percentage_score + points_per_game_score + rebounds_per_game_score + assists_per_game_score + steals_per_game_score + blocks_per_game_score - turnovers_per_game_score + player_efficiency_rating_score + twitter_sentiment_score

        return total_value/1000000
    end
end
