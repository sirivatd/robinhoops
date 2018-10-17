import React from "react";
import BuySell from "./buy_sell";
import { connect } from "react-redux";

const mSP = (props, ownProps) => {
  return {
    stocks: Object.values(ownProps.stocks),
    currentUser: ownProps.currentUser,
    orders: Object.values(ownProps.orders),
    athleteId: ownProps.athleteId
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mSP,
  null
)(BuySell);
