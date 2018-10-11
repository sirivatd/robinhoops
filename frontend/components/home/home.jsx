import React from "react";
import { fetchAthlete } from "./../../util/athlete_api_util";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freeStock: {},
      freeAthlete: {}
    };
    this.freeStockClicked = this.freeStockClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetchStocks();
    window.fetchAthlete = fetchAthlete;
  }

  freeStockClicked(e) {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * this.props.stocks.length);
    const freeSection = document.getElementById("free-stock-section");
    freeSection.classList.remove("jackInTheBox");
    freeSection.classList.add("lightSpeedOut");
    this.setState({ freeStock: this.props.stocks[randomNum] });
    console.log(document.getElementsByClassName("free-stock-result")[0]);
    document.getElementById("free-stock-view").setAttribute("id", "show");
    fetchAthlete(this.props.stocks[randomNum].athlete_id).then(athlete => {
      this.setState({ freeAthlete: Object.values(athlete)[0] });
    });
  }

  render() {
    let currentUser = this.props.currentUser;
    const loader = () => (
      <span className="cssload-loader">
        <span className="cssload-loader-inner" />
      </span>
    );

    const freeStockView = () => (
      <div id="free-stock-view" className="free-stock-result">
        <img
          id="free-player-picture"
          src={this.state.freeAthlete.image_url}
          alt="Player picture"
        />

        <div id="player-info">
          <h1 id="free-price">${this.state.freeStock.initial_price}</h1>
          <h3 id="free-player-name">{this.state.freeAthlete.name}</h3>
          <br />
          <hr />
          <br />
          <button id="free-stock-button">Next</button>
        </div>
      </div>
    );

    console.log(this.state.freeAthlete);

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
        {this.state.freeAthlete ? freeStockView() : loader()}
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

export default Home;
