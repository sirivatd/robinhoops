import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import Home from "./home";
import { logout } from "../../actions/session_actions";
import { fetchStocks, receiveAStock } from "../../actions/stock_actions";
import {
  fetchAllOrders,
  receiveAllOrders,
  receiveOrder
} from "../../actions/order_actions";
import {
  fetchAllAthletes,
  receiveAthlete
} from "../../actions/athlete_actions";

const mapStateToProps = (
  { session: { id, firstTime }, entities: { users, stocks, orders, athletes } },
  ownProps
) => {
  return {
    stocks: Object.values(stocks),
    currentUser: users[id],
    firstTime: firstTime,
    orders: Object.values(orders),
    athletes: Object.values(athletes)
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchStocks: () => dispatch(fetchStocks()),
  fetchAllOrders: userId => dispatch(fetchAllOrders(userId)),
  fetchAllAthletes: () => dispatch(fetchAllAthletes()),
  fetchStocks: () => dispatch(fetchStocks()),
  receiveAStock: stock => dispatch(receiveAStock(stock))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
