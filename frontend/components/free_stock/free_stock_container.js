import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import FreeStock from "./free_stock";
import { fetchStocks } from "../../actions/stock_actions";

const mSP = ({ session, entities: { user, stocks } }, ownProps) => {
  return {
    stocks: Object.values(stocks)
  };
};

const mDP = dispatch => ({
  logout: () => dispatch(logout()),
  fetchStocks: () => dispatch(fetchStocks())
});

export default connect(
  mSP,
  mDP
)(FreeStock);
