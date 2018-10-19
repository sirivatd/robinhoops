import { connect } from "react-redux";
import React from "react";
import UsersStockIndex from "./user_stocks_index";

const mSP = (
  { session, entities: { users, stocks, orders, athletes, watchlistItems } },
  ownProps
) => {
  return {
    stocks: Object.values(stocks),
    currentUser: users[session.id],
    orders: Object.values(orders),
    athletes: Object.values(athletes),
    watchlistItems: Object.values(watchlistItems)
  };
};

export default connect(
  mSP,
  null
)(UsersStockIndex);
