import React from "react";
import TopMoversIndexItem from "./top_movers_index_item";
import { fetchAllAthletes } from "./../../../actions/athlete_actions";
import { fetchStocks } from "./../../../actions/stock_actions";
import { fetchTweets } from "./../../../actions/tweet_actions";

class TopMoversIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topAthletes: [],
      tweets: []
    };
  }

  componentDidMount() {
    this.props.fetchAllAthletes();
    this.props.fetchStocks();
    let topAthletes = [];
    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(Math.random() * this.props.athletes.length);
      if (topAthletes.includes(randomNum)) {
      } else {
        topAthletes.push(randomNum);
      }
    }
    this.setState({
      topAthletes: topAthletes
    });
  }

  render() {
    const loader = () => (
      <span className="cssload-loader">
        <span className="cssload-loader-inner" />
      </span>
    );
    const athleteItems = () =>
      this.state.topAthletes.map(topAthlete => (
        <TopMoversIndexItem
          key={topAthlete}
          athlete={this.props.athletes[topAthlete]}
          price={this.props.stocks[topAthlete].current_price}
        />
      ));

    return (
      <div className="top-movers-container">
        {this.props.athletes.length > 0 ? athleteItems() : loader()}
      </div>
    );
  }
}

export default TopMoversIndex;
