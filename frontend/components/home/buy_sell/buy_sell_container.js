import React from "react";
import BuySell from "./buy_sell";
import { connect } from "react-redux";
import { createOrder, fetchAllOrders } from "./../../../actions/order_actions";
import { receiveCurrentUser } from "./../../../actions/session_actions";

const mSP = (props, ownProps) => {
  return {
    stocks: Object.values(ownProps.stocks),
    currentUser: ownProps.currentUser,
    orders: Object.values(ownProps.orders),
    athleteId: ownProps.athleteId
  };
};

const mapDispatchToProps = dispatch => ({
  createOrder: order => dispatch(createOrder(order)),
  fetchAllOrders: () => dispatch(fetchAllOrders()),
  receiveCurrentUser: user => dispatch(receiveCurrentUser(user))
});

export default connect(
  mSP,
  mapDispatchToProps
)(BuySell);
