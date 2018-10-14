import React from "react";
import { fetchAthlete, fetchAllAthletes } from "./../../util/athlete_api_util";
import { createOrder } from "./../../util/order_api_util";
import UserStocksContainer from "./user_stocks/user_stocks_container";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllOrders(this.props.currentUser.id);
    this.props.fetchAllAthletes();
    this.props.fetchStocks();
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  showMenu() {
    const menu = document.getElementsByClassName("account-settings-menu")[0];
    menu.classList.toggle("hidden-menu");
  }

  handleClick(e) {
    const button = document.getElementById("account-button");

    if (
      document
        .getElementsByClassName("account-settings-menu")[0]
        .contains(e.target) ||
      button.contains(e.target)
    ) {
      return;
    }
    this.handleClickOutside();
  }

  handleClickOutside() {
    const menu = document.getElementsByClassName("account-settings-menu")[0];
    if (menu.classList.contains("hidden-menu")) {
    } else {
      menu.classList.toggle("hidden-menu");
    }
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

    const userStocksIndex = () => <UserStocksContainer />;

    const accountSettings = () => (
      <div className="account-settings-menu hidden-menu">
        <div className="account-settings-stats">
          <h3 className="account-settings-name">Don Sirivat</h3>
          <div className="account-setting-port">
            <h4 className="account-setting-port-value">$12,034.12</h4>

            <h4 className="account-setting-label">Portfolio Value</h4>
          </div>

          <div className="account-setting-power">
            <h4 className="account-setting-power-value">$1524.23</h4>
            <h4 className="account-setting-label">Buying Power</h4>
          </div>
        </div>
        <hr className="account-setting-divider" />
        <ul
          className="account-settings-list"
          onClick={() => this.props.logout(currentUser)}
        >
          <li className="account-settings-item">Logout</li>
        </ul>
      </div>
    );

    return (
      <div className="home-section">
        {accountSettings()}
        <div className="fixed-nav-bar">
          <img
            className="logo-img"
            src="https://media.glassdoor.com/sqll/1167765/robinhood-squarelogo-1530549970728.png"
          />
          <nav className="login-signup">
            <button className="login-logout-button">Leaderboard</button>
            <button
              id="account-button"
              className="login-logout-button"
              onClick={this.showMenu}
            >
              Account
            </button>
          </nav>
        </div>
        {Object.values(this.props.athletes).length > 0
          ? userStocksIndex()
          : loader()}
      </div>
    );
  }
}

export default Home;
