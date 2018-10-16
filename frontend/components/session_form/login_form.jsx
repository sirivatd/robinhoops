import React from "react";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.receiveErrors([]);
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
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <div className="img-container">
          <img
            className="login-image"
            src="https://d2ue93q3u507c2.cloudfront.net/assets/generated_assets/94977d34f99015525dcd0fc9987fcbe6.png"
            alt="A plain green background"
          />
        </div>
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <h2 className="login-header">Welcome to Robinhoops.io</h2>
          <div className="login-form">
            <br />
            <label className="email-text">
              Email or Username
              <br />
              <br />
              <input
                onKeyPress={e => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                className="login-input"
              />
            </label>
            <br />
            <br />
            <label className="password-text">
              Password
              <br />
              <br />
              <input
                onKeyPress={e => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                className="login-input"
              />
            </label>
            <br />
            <br />
            {this.props.navLink}
            <br />
            <br />
            {this.renderErrors()}

            <br />
            <br />
            <input
              id="login-button"
              className="login-submit"
              type="submit"
              value="Sign In"
            />
          </div>
        </form>
        <br />
      </div>
    );
  }
}

export default withRouter(LoginForm);
