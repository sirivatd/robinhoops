import React from "react";
import UserStocksItem from "./user_stocks_item";
import { fetchAthlete } from "./../../../util/athlete_api_util";

class UserStocksIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="user-stocks-card animated fadeInRight">
        <h2 className="user-stocks-title">Stocks</h2>
        <hr className="user-stocks-break-line" />
        {this.props.orders.map(order => (
          <UserStocksItem
            key={order.id}
            order={order}
            currentUser={this.props.currentUser}
          />
        ))}
      </ul>
    );
  }
}

export default UserStocksIndex;
