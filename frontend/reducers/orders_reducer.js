import merge from "lodash/merge";

import { RECEIVE_ALL_ORDERS, RECEIVE_A_ORDER } from "../actions/order_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";

const ordersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_ORDERS:
      return merge({}, state, action.orders);
    case RECEIVE_A_ORDER:
      return merge({}, state, action.order);
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default ordersReducer;
