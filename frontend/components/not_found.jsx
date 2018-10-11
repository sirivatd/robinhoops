import React from "react";
import { withRouter } from "react-router-dom";

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="not-found-section">
        <div className="fixed-nav-bar">
          <img
            onClick={() => this.props.history.push("/")}
            className="logo-img"
            src="https://media.glassdoor.com/sqll/1167765/robinhood-squarelogo-1530549970728.png"
          />
        </div>
        <div className="not-found-content">
          <h1 className="not-found-error-text">Wow</h1>
          <h1 className="not-found-subtitle">Such 404</h1>
          <br />
          <br />
          <h4 className="not-found-description">
            We couldn't find the page you were looking for.
          </h4>
          <h4 className="not-found-description">
            It seems you may have taken a wrong turn.
          </h4>
          <br />
          <br />
          <br />
          <button
            onClick={() => this.props.history.push("/")}
            className="not-found-button"
          >
            Go Home
          </button>
        </div>
        <div className="not-found-visual">
          <img
            className="doge-picture"
            src="https://i.imgur.com/5flmbbF.jpg"
            alt="doge"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(NotFound);
