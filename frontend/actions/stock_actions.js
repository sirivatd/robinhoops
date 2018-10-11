import * as APIUtil from "../util/stock_api_util";

export const RECEIVE_ALL_STOCKS = "RECEIVE_ALL_STOCKS";
export const RECEIVE_A_STOCK = "RECEIVE_A_STOCK";

export const receiveAllStocks = stocks => {
  return {
    type: RECEIVE_ALL_STOCKS,
    stocks: stocks
  };
};

export const receiveAStock = stock => {
  return {
    type: RECEIVE_A_STOCK,
    stock: stock
  };
};

// thunk action creators

export const fetchStocks = () => dispatch => {
  return APIUtil.fetchStocks().then(res => dispatch(receiveAllStocks(res)));
};

export const fetchStock = id => dispatch => {
  return APIUtil.fetchStock(id).then(stock => dispatch(receiveAStock(stock)));
};
