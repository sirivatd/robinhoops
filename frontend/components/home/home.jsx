import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.freeStockClicked = this.freeStockClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetchStocks();
  }

  freeStockClicked(e) {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * this.props.stocks.length);
    console.log(randomNum);
    console.log(this.props.stocks);
    console.log(this.props.stocks[randomNum]);
    const freeSection = document.getElementById("free-stock-section");
    freeSection.classList.remove("jackInTheBox");
    freeSection.classList.add("lightSpeedOut");
  }

  render() {
    let currentUser = this.props.currentUser;
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
        <span className="cssload-loader">
          <span className="cssload-loader-inner" />
        </span>
        <div
          id="free-stock-section"
          className="free-stock-pop-up animated jackInTheBox"
        >
          <h1 className="free-stock-header">WE LOVE NEW USERS!</h1>
          <h2 className="free-stock-subtitle">
            To get you started, here's a free stock on us.
          </h2>
          <button
            id="free-stock-button-1"
            className="free-stock-button"
            onClick={this.freeStockClicked}
          />
          <button
            id="free-stock-button-2"
            className="free-stock-button"
            onClick={this.freeStockClicked}
          />
          <button
            id="free-stock-button-3"
            className="free-stock-button"
            onClick={this.freeStockClicked}
          />
        </div>
      </div>
    );
  }
}

export default Home;
