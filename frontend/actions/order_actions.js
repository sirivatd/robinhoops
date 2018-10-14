import * as APIUtil from "../util/order_api_util";

export const RECEIVE_ALL_ORDERS = "RECEIVE_ALL_ORDERS";
export const RECEIVE_A_ORDER = "RECEIVE_A_ORDER";

export const receiveAllOrders = orders => {
  return {
    type: RECEIVE_ALL_ORDERS,
    orders: orders
  };
};

export const receiveOrder = order => {
  return {
    type: RECEIVE_A_ORDER,
    order: order
  };
};

// thunk action creators

export const fetchAllOrders = id => dispatch => {
  return APIUtil.fetchAllOrders(id).then(res =>
    dispatch(receiveAllOrders(res))
  );
};

export const createOrder = order => dispatch => {
  return APIUtil.createOrder(order).then(res => {
    dispatch(receiveOrder(res));
  });
};
