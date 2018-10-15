import React from "react";
import TopMoversIndexItem from "./top_movers_index_item";

class TopMoversIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let topAthletes = [1, 2, 3, 4, 5, 10];
    return topAthletes.map(topAthlete => (
      <TopMoversIndexItem
        key={topAthlete}
        athlete={this.props.athletes[topAthlete]}
        price={this.props.stocks[topAthlete].current_price}
      />
    ));
  }
}

export default TopMoversIndex;
