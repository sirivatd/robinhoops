import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import Home from "./home";
import { logout } from "../../actions/session_actions";
import { fetchStocks } from "../../actions/stock_actions";

const mapStateToProps = (
  { session, entities: { users, stocks } },
  ownProps
) => {
  return {
    stocks: Object.values(stocks)
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchStocks: () => dispatch(fetchStocks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
