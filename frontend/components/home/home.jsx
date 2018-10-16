import React from "react";
import { fetchAthlete, fetchAllAthletes } from "./../../util/athlete_api_util";
import { createOrder } from "./../../util/order_api_util";
import UserStocksContainer from "./user_stocks/user_stocks_container";
import SearchBar from "./../search_bar/search_bar";
import TopMoversIndex from "./top_movers/top_movers_index";
import HomeChartContainer from "./home_chart/home_chart_container";

import CountUp from "react-countup";
import HomeChartViewContainer from "./home_chart/home_chart_container";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPortValue: 0,
      previousPortValue: 0,
      previousTotalGain: 0,
      currentTotalGain: 0,
      previousDailyPercentGain: 0,
      currentDailyPercentGain: 0
    };
    this.showMenu = this.showMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.calculateTotalPortValue = this.calculateTotalPortValue.bind(this);
    this.findStock = this.findStock.bind(this);
    this.calculateTodayGain = this.calculateTodayGain.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllOrders(this.props.currentUser.id);
    this.props.fetchStocks();
    this.props.fetchAllAthletes();

    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  componentWillReceiveProps() {
    this.calculateTotalPortValue();

    this.calculateTodayGain();
  }

  findStock(order) {
    const stockId = parseInt(order.stock_id);
    const stocks = this.props.stocks;
    let stock = {};

    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].id === stockId) {
        stock = stocks[i];
      }
    }
    return stock;
  }

  showMenu() {
    const menu = document.getElementsByClassName("account-settings-menu")[0];
    menu.classList.toggle("hidden-menu");
  }

  calculateTodayGain() {
    let currentTotal = 0;
    let previousTotal = this.state.currentTotalGain;
    let previousPercentGain = this.state.currentDailyPercentGain;
    let initial_price = 0;
    this.props.orders.forEach(order => {
      let totalEquity = order.num_share * this.findStock(order).current_price;
      let initialTotalPrice =
        order.num_share * this.findStock(order).initial_price;
      initial_price += initialTotalPrice;
      currentTotal += totalEquity;
    });

    this.setState({
      previousTotalGain: previousTotal,
      currentTotalGain: currentTotal - initial_price,
      previousDailyPercentGain: previousPercentGain,
      currentDailyPercentGain:
        ((currentTotal - initial_price) / initial_price) * 100
    });
  }

  calculateTotalPortValue() {
    let total = 0;
    let currentTotal = this.state.totalPortValue;
    this.props.orders.forEach(order => {
      let totalEquity = order.num_share * this.findStock(order).current_price;
      total += totalEquity;
    });
    this.setState({
      previousPortValue: currentTotal,
      totalPortValue: total + this.props.currentUser.buying_power
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

    const chartView = () => (
      <div className="home-chart-view">
        <h2 className="home-port-value">
          ${this.state.totalPortValue.toFixed(2)}
        </h2>
        <h4 className="home-daily-gain">
          {this.state.currentTotalGain > 0 ? "+ " : "- "}
          <CountUp
            start={Math.abs(this.state.previousTotalGain)}
            end={Math.abs(this.state.currentTotalGain)}
            duration={5}
            separator=","
            decimals={2}
            decimal="."
            prefix=""
          />{" "}
          (
          <CountUp
            start={this.state.previousDailyPercentGain}
            end={this.state.currentDailyPercentGain}
            duration={5}
            separator=","
            decimals={2}
            decimal="."
            prefix=""
          />
          %) Today
        </h4>
        <div className="home-chart-container">
          <HomeChartContainer />
        </div>

        {/* <ResponsiveContainer width="100%" height={300}>
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
        </ResponsiveContainer> */}
      </div>
    );

    const userStocksIndex = () => <UserStocksContainer />;

    const accountSettings = () => (
      <div className="account-settings-menu hidden-menu">
        <div className="account-settings-stats">
          <h3 className="account-settings-name">Don Sirivat</h3>
          <div className="account-setting-port">
            <h4 className="account-setting-port-value">
              ${this.state.totalPortValue.toFixed(2)}
            </h4>

            <h4 className="account-setting-label">Portfolio Value</h4>
          </div>

          <div className="account-setting-power">
            <h4 className="account-setting-power-value">
              ${this.props.currentUser.buying_power.toFixed(2)}
            </h4>
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
        <TopMoversIndex
          athletes={this.props.athletes}
          stocks={this.props.stocks}
        />
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
            {/* <button className="login-logout-button">Leaderboard</button> */}
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
        )}
      </div>
    );
  }
}

export default Home;
