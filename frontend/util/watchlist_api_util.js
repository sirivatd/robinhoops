export const fetchWatchlistItems = userId => {
  return $.ajax({
    url: `/api/users/${userId}/watchlist_items`,
    method: "GET"
  });
};

export const createWatchlistItem = (userId, item) => {
  return $.ajax({
    url: `/api/users/${userId}/watchlist_items`,
    method: "POST",
    data: { watchlist_item: item }
  });
};

export const deleteWatchlistItem = (userId, itemId) => {
  return $.ajax({
    url: `/api/users/${userId}/watchlist_items/${itemId}`,
    method: "DELETE"
  });
};
