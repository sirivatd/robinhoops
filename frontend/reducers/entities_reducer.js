import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import stocksReducer from "./stocks_reducer";
import ordersReducer from "./orders_reducer";
import athletesReducer from "./athletes_reducer";
import watchlistItemsReducer from "./watchlist_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  stocks: stocksReducer,
  orders: ordersReducer,
  athletes: athletesReducer,
  watchlistItems: watchlistItemsReducer
});

export default entitiesReducer;
