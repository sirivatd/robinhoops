import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import Home from "./home";
import { logout } from "../../actions/session_actions";
import { fetchStocks } from "../../actions/stock_actions";
import { fetchAllOrders } from "../../actions/order_actions";

const mapStateToProps = (
  { session, entities: { users, stocks, orders } },
  ownProps
) => {
  return {
    stocks: Object.values(stocks),
    currentUser: users[session.id],
    orders: Object.values(orders)
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchStocks: () => dispatch(fetchStocks()),
  fetchAllOrders: userId => dispatch(fetchAllOrders(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
