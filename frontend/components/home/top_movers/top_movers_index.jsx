import React from "react";
import TopMoversIndexItem from "./top_movers_index_item";

class TopMoversIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.athletes
      .slice(0, 7)
      .map(athlete => (
        <TopMoversIndexItem key={athlete.id} athlete={athlete} />
      ));
  }
}

export default TopMoversIndex;
