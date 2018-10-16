import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import TopMoversIndex from "./top_movers_index";
import { fetchAllAthletes } from "./../../../actions/athlete_actions";
import { fetchStocks } from "../../../actions/stock_actions";
import { logout } from "../../../actions/session_actions";

const mapStateToProps = (
  { session, entities: { athletes, users, orders, stocks } },
  ownProps
) => {
  return {
    currentUser: users[session.id],
    athletes: Object.values(athletes),
    orders: Object.values(orders),
    stocks: Object.values(stocks)
  };
};

const mDP = dispatch => ({
  fetchAllAthletes: () => dispatch(fetchAllAthletes()),
  logout: () => dispatch(logout()),
  fetchStocks: () => dispatch(fetchStocks())
});

export default connect(
  mapStateToProps,
  mDP
)(TopMoversIndex);
