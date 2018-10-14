import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import Home from "./home";
import { logout } from "../../actions/session_actions";
import { fetchStocks } from "../../actions/stock_actions";
import { fetchAllOrders } from "../../actions/order_actions";
import { fetchAllAthletes } from "../../actions/athlete_actions";

const mapStateToProps = (
  { session, entities: { users, stocks, orders, athletes } },
  ownProps
) => {
  return {
    stocks: stocks,
    currentUser: users[session.id],
    orders: Object.values(orders),
    athletes: Object.values(athletes)
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchStocks: () => dispatch(fetchStocks()),
  fetchAllOrders: userId => dispatch(fetchAllOrders(userId)),
  fetchAllAthletes: () => dispatch(fetchAllAthletes()),
  fetchStocks: () => dispatch(fetchStocks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
