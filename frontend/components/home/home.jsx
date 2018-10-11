import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let currentUser = this.props.currentUser;
    return (
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
    );
  }
}

export default Home;
