import React from "react";
import { fetchAthlete, fetchAllAthletes } from "./../../util/athlete_api_util";
import { createOrder } from "./../../util/order_api_util";
import UserStocksContainer from "./user_stocks/user_stocks_container";
import SearchBar from "./../search_bar/search_bar";
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
      {
        date: "2013-10-14",
        open: 3.87,
        high: 4.05,
        low: 3.85,
        close: 3.97,
        volume: 63574509,
        unadjustedVolume: 63574509,
        change: 0.14,
        changePercent: 3.655,
        vwap: 3.965,
        label: "Oct 14, 13",
        changeOverTime: 0
      },
      {
        date: "2013-10-15",
        open: 4.03,
        high: 4.1,
        low: 4.01,
        close: 4.02,
        volume: 51957120,
        unadjustedVolume: 51957120,
        change: 0.05,
        changePercent: 1.259,
        vwap: 4.057,
        label: "Oct 15, 13",
        changeOverTime: 0.012594458438286996
      },
      {
        date: "2013-10-16",
        open: 4.1,
        high: 4.1,
        low: 4.025,
        close: 4.09,
        volume: 34038975,
        unadjustedVolume: 34038975,
        change: 0.07,
        changePercent: 1.741,
        vwap: 4.0634,
        label: "Oct 16, 13",
        changeOverTime: 0.03022670025188908
      },
      {
        date: "2013-10-17",
        open: 4.12,
        high: 4.13,
        low: 4.06,
        close: 4.09,
        volume: 44715674,
        unadjustedVolume: 44715674,
        change: 0,
        changePercent: 0,
        vwap: 4.0758,
        label: "Oct 17, 13",
        changeOverTime: 0.03022670025188908
      },
      {
        date: "2013-10-18",
        open: 3.56,
        high: 3.66,
        low: 3.51,
        close: 3.53,
        volume: 108732538,
        unadjustedVolume: 108732538,
        change: -0.56,
        changePercent: -13.692,
        vwap: 3.5974,
        label: "Oct 18, 13",
        changeOverTime: -0.11083123425692705
      },
      {
        date: "2013-10-21",
        open: 3.56,
        high: 3.56,
        low: 3.3,
        close: 3.37,
        volume: 68809614,
        unadjustedVolume: 68809614,
        change: -0.16,
        changePercent: -4.533,
        vwap: 3.3859,
        label: "Oct 21, 13",
        changeOverTime: -0.15113350125944586
      }
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
          <SearchBar athletes={this.props.athletes} />
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
