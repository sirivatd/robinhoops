@scores.each do |score|
    json.set! score.id do
        json.extract! score, :id, :twitter_sentiment, :athlete_id, :created_at
    end
end