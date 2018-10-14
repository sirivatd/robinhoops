import React from "react";
import { fetchAthlete, fetchAllAthletes } from "./../../util/athlete_api_util";
import { createOrder } from "./../../util/order_api_util";
import UserStocksContainer from "./user_stocks/user_stocks_container";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import CountUp from "react-countup";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPortValue: 0
    };
    this.showMenu = this.showMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.calculateTotalPortValue = this.calculateTotalPortValue.bind(this);
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

  componentWillReceiveProps() {
    this.calculateTotalPortValue();
  }

  showMenu() {
    const menu = document.getElementsByClassName("account-settings-menu")[0];
    menu.classList.toggle("hidden-menu");
  }

  calculateTotalPortValue() {
    let total = 0;
    this.props.orders.forEach(order => {
      let totalEquity = order.num_share * order.purchase_price;
      total += totalEquity;
    });
    this.setState({
      totalPortValue: total
    });
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

    const chartData = [
      { value: 14, time: 1503617297689 },
      { value: 15, time: 1503616962277 },
      { value: 15, time: 1503616882654 },
      { value: 20, time: 1503613184594 },
      { value: 15, time: 1503611308914 }
    ];

    const chartView = () => (
      <div className="home-chart-view">
        <h2 className="home-port-value">
          <CountUp
            start={0}
            end={this.state.totalPortValue}
            duration={2.75}
            separator=","
            decimals={2}
            decimal="."
            prefix="$"
          />
        </h2>
        <h4 className="home-daily-gain">+1,854.26 (5.62%) Today</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <XAxis dataKey="year" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line
              connectNulls={true}
              type="monotone"
              dataKey="Zambia"
              stroke="black"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
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

    const topMovers = () => (
      <div className="top-movers-section">
        <h3>Top Movers</h3>
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
        {Object.values(this.props.athletes).length > 0 ? chartView() : loader()}
        {Object.values(this.props.athletes).length > 0 ? topMovers() : loader()}
        {Object.values(this.props.athletes).length > 0
          ? userStocksIndex()
          : loader()}
      </div>
    );
  }
}

export default Home;
