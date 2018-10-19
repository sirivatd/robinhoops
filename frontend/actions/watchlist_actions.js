import * as APIUtil from "../util/watchlist_api_util";

export const RECEIVE_WATCHLIST_ITEM = "RECEIVE_WATCHLIST_ITEM";
export const RECEIVE_ALL_WATCHLIST_ITEMS = "RECEIVE_ALL_WATCHLIST_ITEMS";
export const REMOVE_WATCHLIST_ITEM = "REMOVE_WATCHLIST_ITEM";

export const receiveAllWatchlistItems = items => {
  return {
    type: RECEIVE_ALL_WATCHLIST_ITEMS,
    items: items
  };
};

export const receiveWatchlistItem = item => {
  return {
    type: RECEIVE_WATCHLIST_ITEM,
    item: item
  };
};

export const removeWatchlistItem = item => {
  return {
    type: REMOVE_WATCHLIST_ITEM,
    item: item
  };
};

// thunk action creators

export const addWatchlistItem = (userId, item) => dispatch => {
  return APIUtil.createWatchlistItem(userId, item).then(res =>
    dispatch(receiveWatchlistItem(res))
  );
};

export const deleteWatchlistItem = (userId, itemId) => dispatch => {
  return APIUtil.deleteWatchlistItem(userId, itemId).then(res =>
    dispatch(removeWatchlistItem(res))
  );
};

export const fetchAllWatchlistItems = userId => dispatch => {
  return APIUtil.fetchWatchlistItems(userId).then(res =>
    dispatch(receiveAllWatchlistItems(res))
  );
};
