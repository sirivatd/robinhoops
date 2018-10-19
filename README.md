# Robinhoops

[Live Site](http://www.robinhoops.io)


Robinhoops is a Robinhood.com clone built with Rails and React/Redux that allows users to invest in the top NBA athletes.

![Alt text](https://user-images.githubusercontent.com/10847668/47234581-20435a80-d38b-11e8-94b9-b2eaf5f1102c.png)

Athletes' prices are updated every few seconds based on their stats and recent overall Twitter sentiment.


## Twitter Sentiment

Credit to sentimental gem
Robinhoops scrapes Twitter for recent tweets and then maps each word and assigns an overall score based on each tweet.

Using Nokogiri and HTTParty

```ruby
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
```

## How it Works

All new users receive $2000.00 and a free stock/athlete.

To be really specific, Robinhoops creates a new user and then store snapshots of portfolio value and twitter sentiment every 20 seconds. These data points are then used to graph stock and user portfolio value volatility. An athlete's price will only fluctuate if users on trading that specific stock.

![Alt text](https://user-images.githubusercontent.com/10847668/47234588-25080e80-d38b-11e8-9bce-29c24704d9e7.png)


## Usage

First, install bundles

```
$ bundle install
```

Install node dependencies
```
$ npm install
```
Start local rails server
```
$ rails server
```

## Credits
The following packages/libraries were used in the development of Robinhoops.io

* [Chart.js](https://www.chartjs.org/)
* [Sentimental gem](https://github.com/7compass/sentimental)
* [News API](https://newsapi.org/)
* [NBA Players Stats API](https://github.com/hlyford/nba-player-stats-api)

