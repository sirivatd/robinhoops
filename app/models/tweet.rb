class Tweet < ApplicationRecord
    belongs_to :athlete

    def self.sync(athlete)
        client = Twitter::REST::Client.new do |config|
            config.consumer_key        = "jrlq2OdVBQzwBkwPMBmwlcYjY"
            config.consumer_secret     = "3zsxDQh5eGzqEklgRnPTNsaPdqLLooXhtF4wcido2jhgvZZdrU"
            config.access_token        = "359603447-2EcA5jn63EWAUp2DZS8bswgG1KIAom5Njpw5lDGv"
            config.access_token_secret = "mZ20O7oooQt5RpdR72mEnbuwxrZTm0c717ofthsV45T5C"
          end
          client.search("to:#{athlete.name}", result_type: "recent").take(1).collect.each do |tweet|
          score = $analyzer.score tweet.text
            Tweet.create({body: tweet.text, athlete_id: athlete.id, score: score})
          end

    end

end
