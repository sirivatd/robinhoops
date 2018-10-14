import { connect } from "react-redux";
import React from "react";
import UsersStockIndex from "./user_stocks_index";

const mSP = (
  { session, entities: { users, stocks, orders, athletes } },
  ownProps
) => {
  return {
    stocks: Object.values(stocks),
    currentUser: users[session.id],
    orders: Object.values(orders),
    athletes: Object.values(athletes)
  };
};

export default connect(
  mSP,
  null
)(UsersStockIndex);
