import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import FreeStock from "./free_stock";
import { fetchStocks } from "../../actions/stock_actions";
import { createOrder } from "../../actions/order_actions";
import { removeFirstUser } from "../../actions/session_actions";

const mSP = ({ session, entities: { user, stocks } }, ownProps) => {
  return {
    stocks: Object.values(stocks)
  };
};

const mDP = dispatch => ({
  logout: () => dispatch(logout()),
  fetchStocks: () => dispatch(fetchStocks()),
  createOrder: order => dispatch(createOrder(order)),
  removeFirstUser: () => dispatch(removeFirstUser())
});

export default connect(
  mSP,
  mDP
)(FreeStock);
