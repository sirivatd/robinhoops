import React from "react";
import { withRouter } from "react-router";
import SearchBar from "./../search_bar/search_bar";
import TopMoversIndexContainer from "./../home/top_movers/top_movers_container";
import { fetchAthleteTweets } from "./../../util/athlete_api_util";
import TweetsIndex from "./tweets/tweets_index";
import BuySellContainer from "./../home/buy_sell/buy_sell_container";
import CountUp from "react-countup";
import AthleteChartViewContainer from "./athlete_chart/athlete_chart_container";

class AthleteShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousPortValue: 0.0,
      totalPortValue: 0.0,
      previousStockValue: 0.0,
      currentStockValue: 0.0,
      athleteId: this.props.match.params.athleteId,
      tweets: [],
      orders: this.props.orders,
      currentUser: this.props.currentUser,
      previousDailyPercentGain: 0.0,
      currentDailyPercentGain: 0.0,
      previousTotalGain: 0.0,
      currentTotalGain: 0.0
    };

    this.findAthlete = this.findAthlete.bind(this);
    this.findStock = this.findStock.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllAthletes();
    this.props.fetchStocks();
    this.props.fetchAllOrders(this.props.currentUser.id);
    fetchAthleteTweets(this.state.athleteId).then(res =>
      this.setState({ tweets: Object.values(res) })
    );
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stocks: this.props.stocks
    });
    this.findStock(this.state.athleteId);

    if (
      this.props.match.params.athleteId !== nextProps.match.params.athleteId
    ) {
      this.setState({
        athleteId: nextProps.match.params.athleteId,
        previousStockValue: 0,
        currentStockValue: 0,
        previousDailyPercentGain: 0,
        currentDailyPercentGain: 0
      });
      this.findStock(this.state.athleteId);

      fetchAthleteTweets(nextProps.match.params.athleteId).then(res => {
        this.setState({
          tweets: Object.values(res)
        });
      });
    }
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

  findStock(athleteId) {
    const stocks = this.props.stocks;
    let stock = {};
    for (let i = 0; i < this.props.stocks.length; i++) {
      if (this.props.stocks[i].athlete_id === parseInt(this.state.athleteId)) {
        let totalGain =
          this.props.stocks[i].current_price -
          this.props.stocks[i].initial_price;

        this.setState({
          previousStockValue: this.state.currentStockValue,
          currentStockValue: this.props.stocks[i].current_price,
          previousDailyPercentGain: this.state.currentDailyPercentGain,
          currentDailyPercentGain:
            (totalGain / this.props.stocks[i].initial_price) * 100,
          previousTotalGain: this.state.currentTotalGain,
          currentTotalGain: totalGain,
          currentStock: this.props.stocks[i],
          orders: this.props.orders
        });
      }
    }
  }

  calculateTotalPortValue() {
    let total = 0;
    let currentTotal = this.state.totalPortValue;

    this.props.orders.forEach(order => {
      let stockEquity = this.findStock(order).current_price;
      if (!stockEquity) {
        stockEquity = 0;
      }
      let totalEquity = order.num_share * stockEquity;
      total += totalEquity;
    });

    this.setState({
      previousPortValue: currentTotal,
      totalPortValue: total + this.props.currentUser.buying_power
    });
  }

  findAthlete(id) {
    let athlete = {};
    for (let i = 0; i < this.props.athletes.length; i++) {
      if (this.props.athletes[i].id === id) {
        athlete = this.props.athletes[i];
      }
    }
    return athlete;
  }

  render() {
    const loader = () => (
      <span className="cssload-loader">
        <span className="cssload-loader-inner" />
      </span>
    );
    const athleteName = () => <h1>{this.props.athlete.name}</h1>;
    const accountSettings = () => (
      <div className="account-settings-menu hidden-menu">
        <div className="account-settings-stats">
          <h3 className="account-settings-name">
            {this.props.currentUser.first_name}{" "}
            {this.props.currentUser.last_name}
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

    const athleteHeader = () => (
      <div className="athlete-show-header">
        <div className="athlete-show-name">
          {this.props.athletes.length > 0 ? athleteName() : loader()}
        </div>
        <div className="athlete-show-price">
          {" "}
          <CountUp
            start={this.state.previousStockValue.toFixed(2)}
            end={this.state.currentStockValue.toFixed(2)}
            duration={5}
            separator=","
            decimals={2}
            decimal="."
            prefix="$"
          />
        </div>
        <div className="athlete-show-percent-change">
          {this.state.currentTotalGain > 0 ? "+ " : "- "}
          <CountUp
            start={Math.abs(this.state.previousTotalGain)}
            end={Math.abs(this.state.currentTotalGain)}
            duration={5}
            separator=","
            decimals={2}
            decimal="."
            prefix="$"
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
        </div>
      </div>
    );

    const athleteStats = () => (
      <div className="athlete-stats-section">
        <h1 className="athlete-stats-header"> Statistics</h1>
        <hr className="athlete-show-break-line" />
      </div>
    );

    const athleteGraph = () => (
      <div className="athlete-show-graph">
        <AthleteChartViewContainer
          orders={this.props.orders}
          athleteId={parseInt(this.state.athleteId)}
          currentUser={this.state.currentUser}
          stocks={this.props.stocks}
        />
      </div>
    );

    const buySellSection = () => (
      <div className="athlete-show-buy-sell animated slideInRight">
        <BuySellContainer
          orders={this.props.orders}
          athleteId={parseInt(this.state.athleteId)}
          currentUser={this.state.currentUser}
          stocks={this.props.stocks}
        />
      </div>
    );

    const athleteImage = () => (
      <div className="athlete-show-image-container">
        <img
          className="athlete-show-headshot animated fadeInUp delay-1s"
          src={this.props.athlete.image_url}
          alt="athlete headshot"
        />
      </div>
    );

    const athleteTweets = () => (
      <div className="athlete-tweets-container">
        <h1 className="athlete-stats-header">Recent Tweets</h1>
        <hr className="athlete-show-break-line" />
        <TweetsIndex tweets={this.state.tweets} />
      </div>
    );

    const similarAthletes = () => (
      <div className="athlete-similar-container">
        <h1 className="athlete-stats-header">Similar Athletes</h1>
        <hr className="athlete-show-break-line" />
        <TopMoversIndexContainer />
      </div>
    );

    return (
      <div className="athlete-show-section">
        {accountSettings()}
        <div className="fixed-nav-bar">
          <img
            onClick={() => this.props.history.push("/")}
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

        {Object.values(this.props.athletes).length > 0
          ? athleteHeader()
          : loader()}
        {athleteGraph()}
        {Object.values(this.props.athletes).length > 0
          ? athleteStats()
          : loader()}

        {Object.values(this.props.athletes).length > 0 &&
        Object.values(this.props.athletes).length > 0
          ? buySellSection()
          : loader()}

        <button className="watchlist-button">Add to Watchlist</button>

        {Object.values(this.props.athletes).length > 0
          ? athleteImage()
          : loader()}
        {Object.values(this.state.tweets).length > 0
          ? athleteTweets()
          : loader()}
        {Object.values(this.props.athletes).length > 0
          ? similarAthletes()
          : loader()}
      </div>
    );
  }
}

export default withRouter(AthleteShow);
