import React from "react";
import { fetchAthlete } from "./../../util/athlete_api_util";
import { createOrder } from "./../../util/order_api_util";
import UserStocksIndex from "./user_stocks/user_stocks_index";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllOrders(this.props.currentUser.id);
  }

  render() {
    let currentUser = this.props.currentUser;
    const loader = () => (
      <span className="cssload-loader">
        <span className="cssload-loader-inner" />
      </span>
    );

    const userOrders = () => (
      <ul className="user-stock-card">
        {this.props.orders.map(order => (
          <li>{order.purchase_price}</li>
        ))}
      </ul>
    );

    const userStocksIndex = () => (
      <UserStocksIndex orders={this.props.orders} />
    );

    return (
      <div className="home-section">
        <div className="fixed-nav-bar">
          <img
            className="logo-img"
            src="https://media.glassdoor.com/sqll/1167765/robinhood-squarelogo-1530549970728.png"
          />
          <nav className="login-signup">
            <button
              className="login-logout-button"
              onClick={() => this.props.logout(currentUser)}
            >
              Logout
            </button>
          </nav>
        </div>
        {Object.values(this.props.orders).length > 0
          ? userStocksIndex()
          : loader()}
      </div>
    );
  }
}

export default Home;
