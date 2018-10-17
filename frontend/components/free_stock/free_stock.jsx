import React from "react";
import { fetchAthlete } from "./../../util/athlete_api_util";
import { withRouter } from "react-router";

class FreeStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freeStock: {},
      freeAthlete: {},
      userId: ""
    };
    this.freeStockClicked = this.freeStockClicked.bind(this);
    this.freeStockReceived = this.freeStockReceived.bind(this);
  }

  componentDidMount() {
    this.props.fetchStocks();
  }

  freeStockClicked(e) {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * this.props.stocks.length);
    const freeSection = document.getElementById("free-stock-section");
    freeSection.classList.remove("jackInTheBox");
    freeSection.classList.add("lightSpeedOut");
    freeSection.setAttribute("id", "hide");
    this.setState({ freeStock: this.props.stocks[randomNum] });
    fetchAthlete(this.props.stocks[randomNum].athlete_id).then(athlete => {
      this.setState({ freeAthlete: Object.values(athlete)[0] });
      document.getElementById("free-stock-view").setAttribute("id", "show");
    });
  }

  freeStockReceived(e) {
    e.preventDefault();
    const freeStock = document.getElementById("show");
    freeStock.classList.remove("fadeInUp");
    freeStock.classList.remove("animated");
    freeStock.setAttribute("id", "hide");
    const newOrder = {
      num_share: 1,
      user_id: parseInt(this.props.match.params.user_id),
      stock_id: this.state.freeStock.id,
      purchase_price: this.state.freeStock.initial_price,
      order_type: "BUY"
    };
    this.props.createOrder(newOrder);
    this.props.removeFirstUser();
    this.props.history.push("/");
  }

  render() {
    let currentUser = this.props.currentUser;
    const loader = () => (
      <span className="cssload-loader">
        <span className="cssload-loader-inner" />
      </span>
    );

    const freeStockView = () => (
      <div id="free-stock-view" className="free-stock-result animated fadeInUp">
        <img
          id="free-player-picture"
          src={this.state.freeAthlete.image_url}
          alt="Player picture"
          className="animated fadeIn"
        />

        <div id="player-info">
          <h1 id="free-price">
            ${this.state.freeStock.initial_price.toFixed(2)}
          </h1>
          <h3 id="free-player-name">{this.state.freeAthlete.name}</h3>
          <br />
          <hr />
          <br />
          <button onClick={this.freeStockReceived} id="free-stock-button">
            Next
          </button>
        </div>
      </div>
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
        {Object.values(this.state.freeStock).length > 0
          ? freeStockView()
          : loader()}
        <div
          id="free-stock-section"
          className="free-stock-pop-up animated jackInTheBox"
        >
          <h1 className="free-stock-header animated zoomIn delay-1s">
            WE LOVE NEW USERS!
          </h1>
          <h2 className="free-stock-subtitle animated fadeInUp delay-1s">
            To get you started, here's a free stock on us.
          </h2>
          <button
            id="free-stock-button-1"
            className="free-stock-button animated fadeInDown delay-2s"
            onClick={this.freeStockClicked}
          />
          <button
            id="free-stock-button-2"
            className="free-stock-button animated fadeInDown delay-3s"
            onClick={this.freeStockClicked}
          />
          <button
            id="free-stock-button-3"
            className="free-stock-button animated fadeInDown delay-4s"
            onClick={this.freeStockClicked}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(FreeStock);
