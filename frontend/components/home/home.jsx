import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const personalGreeting = () => (
      <hgroup className="header-group">
        <h2 className="header-name">
          Hi, {this.props.currentUser.first_name}!
        </h2>
        <button className="header-button" onClick={this.props.logout}>
          Log Out
        </button>
        <h1>You're on the Home page!</h1>
      </hgroup>
    );
    let currentUser = this.props.currentUser;
    return <div>{personalGreeting()}</div>;
  }
}

export default Home;
