import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import AthleteShow from "./athlete_show.jsx";
import { fetchAllAthletes } from "./../../actions/athlete_actions";
import { fetchStocks } from "../../actions/stock_actions";
import { logout } from "../../actions/session_actions";
import { fetchAllOrders } from "./../../actions/order_actions";
import {
  addWatchlistItem,
  fetchAllWatchlistItems,
  deleteWatchlistItem
} from "./../../actions/watchlist_actions";

const mapStateToProps = (
  { session, entities: { athletes, users, orders, stocks, watchlistItems } },
  ownProps
) => {
  return {
    athlete: athletes[ownProps.match.params.athleteId],
    currentUser: users[session.id],
    athletes: Object.values(athletes),
    orders: Object.values(orders),
    stocks: Object.values(stocks),
    watchlistItems: Object.values(watchlistItems)
  };
};

const mDP = dispatch => ({
  fetchAllAthletes: () => dispatch(fetchAllAthletes()),
  logout: () => dispatch(logout()),
  fetchStocks: () => dispatch(fetchStocks()),
  fetchAllOrders: userId => dispatch(fetchAllOrders(userId)),
  addWatchlistItem: (userId, item) => dispatch(addWatchlistItem(userId, item)),
  fetchAllWatchlistItems: userId => dispatch(fetchAllWatchlistItems(userId)),
  deleteWatchlistItem: (userId, itemId) =>
    dispatch(deleteWatchlistItem(userId, itemId))
});

export default connect(
  mapStateToProps,
  mDP
)(AthleteShow);
