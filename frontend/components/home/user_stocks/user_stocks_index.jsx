import React from "react";
import UserStocksItem from "./user_stocks_item";
import { fetchAthlete } from "./../../../util/athlete_api_util";
import { withRouter, Redirect } from "react-router-dom";

class UserStocksIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      normalizedOrders: []
    };
    this.showMenu = this.showMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.findAthlete = this.findAthlete.bind(this);
    this.findStock = this.findStock.bind(this);
    this.normalizeOrders = this.normalizeOrders.bind(this);
    this.findAthleteFromStockId = this.findAthleteFromStockId.bind(this);
    this.findStockFromId = this.findStockFromId.bind(this);
  }

  showMenu() {
    const menu = document.getElementsByClassName("user-stocks-dropdown")[0];
    menu.classList.toggle("hidden-menu");
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
    document
      .getElementsByClassName("user-stocks-dropdown")[0]
      .addEventListener("scroll", this.handleClickOutside);
    this.user;
  }

  componentWillReceiveProps(nextProps) {
    this.normalizeOrders();
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
    document
      .getElementsByClassName("user-stocks-dropdown")[0]
      .removeEventListener("scroll", this.handleClickOutside);
  }

  handleClick(e) {
    const button = document.getElementById("user-stocks-options-btn");
    if (
      document
        .getElementsByClassName("user-stocks-dropdown")[0]
        .contains(e.target) ||
      button.contains(e.target)
    ) {
      return;
    }

    this.handleClickOutside();
  }

  findAthlete(order) {
    const stock = this.findStock(order);
    const athletes = this.props.athletes;
    let athlete = {};
    for (let i = 0; i < athletes.length; i++) {
      if (athletes[i].id === stock.athlete_id) {
        athlete = athletes[i];
      }
    }
    return athlete;
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

  normalizeOrders() {
    let buyOrders = [];
    let sellOrders = [];

    let userAthletes = [];
    let normalizedOrders = [];

    for (let i = 0; i < this.props.orders.length; i++) {
      let order = this.props.orders[i];
      let athlete = this.findAthlete(order);
      if (order.order_type === "BUY") {
        if (userAthletes.indexOf(athlete) !== -1) {
          let index = userAthletes.indexOf(athlete);
          normalizedOrders[index].num_share += order.num_share;
        } else {
          userAthletes.push(athlete);
          normalizedOrders.push(order);
        }
      } else {
        let index = userAthletes.indexOf(athlete);
        normalizedOrders[index].num_share -= order.num_share;
      }
    }

    let result = [];
    for (let j = 0; j < normalizedOrders.length; j++) {
      if (normalizedOrders[j].num_share > 0) {
        result.push(normalizedOrders[j]);
      }
    }
    this.setState({
      normalizedOrders: result
    });
  }

  handleClickOutside() {
    const menu = document.getElementsByClassName("user-stocks-dropdown")[0];
    if (menu.classList.contains("hidden-menu")) {
    } else {
      menu.classList.toggle("hidden-menu");
    }
  }

  findStockFromId(id) {
    for (let i = 0; i < this.props.stocks.length; i++) {
      if (this.props.stocks[i].id === id) {
        return this.props.stocks[i];
      }
    }
    return {};
  }

  findAthleteFromStockId(id) {
    for (let i = 0; i < this.props.athletes.length; i++) {
      if (this.props.athletes[i].id === this.findStockFromId(id).athlete_id) {
        return this.props.athletes[i];
      }
    }
    return {};
  }

  render() {
    return (
      <div>
        <ul className="user-stocks-dropdown hidden-menu">
          <h2 className="user-stocks-options-title">Display</h2>
          <hr className="user-stocks-options-break-line" />

          <li className="user-stocks-option">Last Price</li>
          <li className="user-stocks-option">Percent Change</li>
          <li className="user-stocks-option">Your Equity</li>
          <li className="user-stocks-option">Today's Return</li>
        </ul>
        <ul className="user-stocks-card animated fadeInRight">
          <h2 className="user-stocks-title">Stocks</h2>
          <button
            id="user-stocks-options-btn"
            className="user-stocks-options-button"
            onClick={this.showMenu}
          >
            ...
          </button>

          <hr className="user-stocks-break-line" />
          {this.state.normalizedOrders.map(order => {
            return (
              <UserStocksItem
                key={order.id}
                athlete={this.findAthlete(order)}
                stock={this.findStock(order)}
              />
            );
          })}
          <h2 className="user-stocks-title">Watchlist</h2>
          <hr className="user-stocks-break-line" />
          {this.props.watchlistItems.map(item => {
            return (
              <UserStocksItem
                key={item.id}
                athlete={this.findAthleteFromStockId(item.stock_id)}
                stock={this.findStockFromId(item.stock_id)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(UserStocksIndex);
