@tweets.each do |tweet|
json.set! @athlete.random_num do
json.extract! tweet, :tweetBody, :tweetUsername, :time_created
end
end
