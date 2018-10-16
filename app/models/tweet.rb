require 'nokogiri'
require 'httparty'

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

    def self.scrape_tweeter(athlete_name)
        names = athlete_name.split(" ")
        firstName = names[0]
        lastName = names[1]
       url = "https://twitter.com/search?q=" + lastName + "%20" + firstName + "&src=typd"

       unparsed_page = HTTParty.get(url)
       parsed_page = Nokogiri::HTML(unparsed_page)

       tweetDivs = parsed_page.css('div.tweet')

       scrappedTweets = []
       tweetDivs.each do |div|
        tweetBody = div.css('p.TweetTextSize.js-tweet-text.tweet-text').text
        tweetUsername = div.css("span.username").text
        tweetTimestamp = div.css("span._timestamp").text
        scrappedTweets.push({tweetBody: tweetBody, tweetUsername: tweetUsername, time_created: tweetTimestamp})
    end

       return $analyzer.score scrappedTweets
    end

    def self.find_tweets(athlete_name)
        names = athlete_name.split(" ")
        firstName = names[0]
        lastName = names[1]
       url = "https://twitter.com/search?q=" + lastName + "%20" + firstName + "&src=typd"

       unparsed_page = HTTParty.get(url)
       parsed_page = Nokogiri::HTML(unparsed_page)

       tweetDivs = parsed_page.css('div.tweet')

       scrappedTweets = []
       tweetDivs.each do |div|
        tweetBody = div.css('p.TweetTextSize.js-tweet-text.tweet-text').text
        tweetUsername = div.css("span.username").text
        tweetTimestamp = div.css("span._timestamp").text
        scrappedTweets.push({ tweetBody: tweetBody, tweetUsername: tweetUsername, time_created: tweetTimestamp})
    end

       return scrappedTweets
    end

end
