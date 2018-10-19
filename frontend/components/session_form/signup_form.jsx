import React from "react";
import { withRouter } from "react-router-dom";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      buying_power: 2000
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginAsGuest = this.loginAsGuest.bind(this);
  }

  componentDidMount() {
    this.props.receiveErrors([]);
    this.props.receiveFirstUser();
  }

  loginAsGuest(e) {
    e.preventDefault();
    const emailArr = "demo@demo.com".split("");
    const passwordArr = "password".split("");
    this.setState({ email: "", password: "" }, () =>
      this.loginAsGuestHelper(emailArr, passwordArr)
    );
  }

  randomEmail() {
    let chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let string = "";
    for (let i = 0; i < 15; i++) {
      string += chars[Math.floor(Math.random() * chars.length)];
    }
    let domain = "";
    for (let j = 0; j < 7; j++) {
      domain += chars[Math.floor(Math.random() * chars.length)];
    }
    return string + "@" + domain + ".com";
  }

  loginAsGuestHelper(emailArr, passwordArr) {
    if (emailArr.length > 0) {
      this.setState(
        {
          email: this.state.email + emailArr.shift()
        },
        () => {
          window.setTimeout(
            () => this.loginAsGuestHelper(emailArr, passwordArr),
            70
          );
        }
      );
    } else if (passwordArr.length > 0) {
      this.setState(
        {
          password: this.state.password + passwordArr.shift()
        },
        () => {
          window.setTimeout(
            () => this.loginAsGuestHelper(emailArr, passwordArr),
            100
          );
        }
      );
    } else {
      let user = {
        email: this.randomEmail(),
        first_name: "Demo",
        last_name: "Demo",
        password: "password",
        buying_power: 2000
      };
      this.props.processForm(user);
    }
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }
  renderErrors() {
    return (
      <ul className="error-list">
        {this.props.errors.map((error, i) => (
          <li className="error-text" key={`error-${i}`}>
            {error} <br /> <br />
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form-container">
        <div
          className="logo-container"
          onClick={() => this.props.history.push("/")}
        >
          <img
            className="logo-img"
            src="https://media.glassdoor.com/sqll/1167765/robinhood-squarelogo-1530549970728.png"
          />
        </div>
        <div className="signup-content">
          <form onSubmit={this.handleSubmit} className="signup-form-box">
            <h1 className="signup-header">Make Your Money Move</h1>
            <h3 className="signup-description">
              Robinhoops lets you invest in athletes you love, commission-free.
            </h3>
            <div className="signup-form">
              <div className="name-inputs">
                <input
                  type="text"
                  value={this.state.first_name}
                  onChange={this.update("first_name")}
                  className="signup-first-name-input"
                  placeholder="First name"
                />
                <input
                  type="text"
                  value={this.state.last_name}
                  onChange={this.update("last_name")}
                  className="signup-last-name-input"
                  placeholder="Last name"
                />
              </div>

              <br />
              <br />
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                className="signup-email-input"
                placeholder="Email address"
              />
              <br />
              <br />
              <br />
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                className="signup-password-input"
                placeholder="Password (min. 6 characters)"
              />
              <br />
              <br />
              <br />
              <input
                className="session-submit"
                type="submit"
                value="Continue"
              />
              <br />
              <br />
              <br />
              <br />
              <div className="login-link">
                <span className="login-link-text" />
                <button className="demo-button" onClick={this.loginAsGuest}>
                  Try the demo
                </button>
              </div>
              <br />
              <br />
              <br />
            </div>
          </form>
          <div className="signup-visual-box">
            {this.renderErrors()}

            <img
              className="signup-gif"
              src="https://static1.squarespace.com/static/548f6ec1e4b0ccccd2f1c61b/t/5adabb11352f53992d9621fd/1524284188353/bb2.gif"
              alt="bouncing basketballs"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUpForm);
