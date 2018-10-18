import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import HomeChart from "./home_chart";

const mapStateToProps = (
  { session, entities: { athletes, users, orders, stocks } },
  ownProps
) => {
  return {
    currentUser: users[session.id],
    athletes: Object.values(athletes),
    orders: Object.values(orders),
    stocks: Object.values(stocks)
  };
};
export default connect(
  mapStateToProps,
  null
)(HomeChart);
