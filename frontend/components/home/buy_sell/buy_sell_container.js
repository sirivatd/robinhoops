import React from "react";
import BuySell from "./buy_sell";
import { connect } from "react-redux";

const mSP = (props, ownProps) => {
  return {
    stocks: Object.values(props.entities.stocks),
    currentUser: props.currentUser,
    orders: Object.values(props.entities.orders),
    athletes: Object.values(props.entities.athletes)
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mSP,
  null
)(BuySell);
