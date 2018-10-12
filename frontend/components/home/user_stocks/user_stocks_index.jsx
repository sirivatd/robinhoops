import React from "react";
import UserStocksItem from "./user_stocks_item";
import { fetchAthlete } from "./../../../util/athlete_api_util";

class UserStocksIndex extends React.Component {
  constructor(props) {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
    document
      .getElementsByClassName("user-stocks-dropdown")[0]
      .removeEventListener("scroll", this.handleClickOutside);
  }

  handleClick(e) {
    if (
      document
        .getElementsByClassName("user-stocks-dropdown")[0]
        .contains(e.target)
    ) {
      return;
    }

    this.handleClickOutside();
  }

  handleClickOutside() {
    console.log("Scrolling");
    const menu = document.getElementsByClassName("user-stocks-dropdown")[0];
    if (menu.classList.contains("hidden-menu")) {
    } else {
      menu.classList.toggle("hidden-menu");
    }
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
            className="user-stocks-options-button"
            onClick={this.showMenu}
          >
            ...
          </button>

          <hr className="user-stocks-break-line" />
          {this.props.orders.map(order => (
            <UserStocksItem
              key={order.id}
              order={order}
              currentUser={this.props.currentUser}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default UserStocksIndex;
