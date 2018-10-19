import React from "react";
import { fetchAthlete, fetchAllAthletes } from "./../../util/athlete_api_util";
import { updateOrder } from "./../../util/order_api_util";
import { createOrder } from "./../../util/order_api_util";
import UserStocksContainer from "./user_stocks/user_stocks_container";
import SearchBar from "./../search_bar/search_bar";
import TopMoversIndexContainer from "./top_movers/top_movers_container";
import HomeChartContainer from "./home_chart/home_chart_container";
import HomeChartViewContainer from "./home_chart/home_chart_container";
import NewsArticlesContainer from "./news_articles/news_articles_container";
import CountUp from "react-countup";
import { createUserPortSnapshot } from "./../../util/user_port_snapshots_api_util";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPortValue: 0.0,
      previousPortValue: 0.0,
      previousTotalGain: 0.0,
      currentTotalGain: 0.0,
      previousDailyPercentGain: 0.0,
      currentDailyPercentGain: 0.0,
      orders: this.props.orders,
      athletes: this.props.athletes,
      stocks: this.props.stocks,
      currentUser: this.props.currentUser,
      articles: []
    };
    this.showMenu = this.showMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.calculateTotalPortValue = this.calculateTotalPortValue.bind(this);
    this.findStock = this.findStock.bind(this);
    this.calculateTodayGain = this.calculateTodayGain.bind(this);
    this.updateOrders = this.updateOrders.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllOrders(this.props.currentUser.id);
    this.props.fetchStocks();
    this.props.fetchAllAthletes();
    this.props.fetchAllWatchlistItems(this.props.currentUser.id);

    let url =
      "https://newsapi.org/v2/everything?" +
      "q=nbas&" +
      "apiKey=4ddc19b190b74a96b4b137f0a3e546f9";

    $.ajax({
      url: url,
      method: "GET"
    }).then(res => this.setState({ articles: res.articles }));

    this.intervalId = window.setInterval(this.updateOrders, 20000);
    this.secondIntervalId = window.setInterval(this.updateOrders, 1000);
    document.addEventListener("mousedown", this.handleClick, false);
    this.calculateTotalPortValue();
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.firstTime !== undefined) {
      if (this.props.firstTime === true) {
        this.props.history.push(`/${this.state.currentUser.id}/free-stock`);
      }
    }
  }

  updateOrders() {
    window.clearInterval(this.secondIntervalId);
    console.log("Updating orders");
    let newOrders = [];
    this.props.orders.forEach(order => {
      updateOrder(this.props.currentUser.id, order.id).then(res =>
        this.props.receiveAStock(res)
      );
    });
    let newSnapshot = {
      user_id: this.props.currentUser.id,
      port_value: this.state.totalPortValue
    };
    createUserPortSnapshot(newSnapshot);

    this.props.fetchAllOrders(this.props.currentUser.id);
    this.calculateTotalPortValue();
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
      let stockEquityCurrent = this.findStock(order).current_price;
      if (!stockEquityCurrent) {
        stockEquityCurrent = 0;
      }
      let totalEquity = order.num_share * stockEquityCurrent;
      let stockEquityInitial = this.findStock(order).initial_price;

      if (!stockEquityInitial) {
        stockEquityInitial = 0;
      }
      let initialTotalPrice = order.num_share * stockEquityInitial;
      initial_price += initialTotalPrice;
      currentTotal += totalEquity;
    });

    let currentPortValue = this.state.totalPortValue;
    if (currentPortValue === 0) {
      currentPortValue = 1;
    }

    this.setState({
      previousTotalGain: previousTotal,
      currentTotalGain: currentTotal - initial_price,
      previousDailyPercentGain: previousPercentGain,
      currentDailyPercentGain:
        ((currentTotal - initial_price) / currentPortValue) * 100
    });
  }

  calculateTotalPortValue() {
    let total = 0;
    let currentTotal = this.state.totalPortValue;
    this.props.orders.forEach(order => {
      if (order.order_type === "SELL") {
        let stockEquity = order.purchase_price;
        if (!stockEquity) {
          stockEquity = 0;
        }
        let totalEquity = order.num_share * stockEquity;
        total -= totalEquity;
      } else {
        let stockEquity = this.findStock(order).current_price;
        if (!stockEquity) {
          stockEquity = 0;
        }
        let totalEquity = order.num_share * stockEquity;
        total += totalEquity;
      }
    });

    this.setState({
      previousPortValue: currentTotal,
      totalPortValue: total + this.props.currentUser.buying_power
    });
    this.calculateTodayGain();
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
        {this.state.orders.map(order => (
          <li>{order.purchase_price}</li>
        ))}
      </ul>
    );

    const chartView = () => (
      <div className="home-chart-view">
        <h2 className="home-port-value">
          <CountUp
            start={this.state.previousPortValue.toFixed(2)}
            end={this.state.totalPortValue.toFixed(2)}
            duration={3}
            separator=","
            decimals={2}
            decimal="."
            prefix="$"
          />
        </h2>
        <h4 className="home-daily-gain">
          {this.state.currentTotalGain > 0 ? "+ " : "- "}
          <CountUp
            start={Math.abs(this.state.previousTotalGain)}
            end={Math.abs(this.state.currentTotalGain)}
            duration={3}
            separator=","
            decimals={2}
            decimal="."
            prefix="$"
          />{" "}
          (
          <CountUp
            start={this.state.previousDailyPercentGain}
            end={this.state.currentDailyPercentGain}
            duration={3}
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
      </div>
    );

    const newsArticles = () => (
      <NewsArticlesContainer articles={this.state.articles} />
    );

    const userStocksIndex = () => <UserStocksContainer />;

    const accountSettings = () => (
      <div className="account-settings-menu hidden-menu">
        <div className="account-settings-stats">
          <h3 className="account-settings-name">
            {this.state.currentUser.first_name}{" "}
            {this.state.currentUser.last_name}
          </h3>
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
        <h3 className="top-movers-header">Top Movers</h3>
        <TopMoversIndexContainer />
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
            <button
              onClick={() => (window.location.href = "http://www.dsirivat.com")}
              className="login-logout-button"
            >
              Developer
            </button>
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
        {this.state.articles.length > 0 ? newsArticles() : loader()}
      </div>
    );
  }
}

export default Home;
