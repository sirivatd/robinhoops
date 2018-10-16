import merge from "lodash/merge";

import { RECEIVE_ALL_STOCKS, RECEIVE_A_STOCK } from "../actions/stock_actions";

const stocksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_STOCKS:
      return merge({}, state, action.stocks);
    case RECEIVE_A_STOCK:
      return merge({}, state, action.stock);
    default:
      return state;
  }
};

export default stocksReducer;
