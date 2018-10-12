export const createOrder = order => {
  return $.ajax({
    type: "POST",
    url: `api/users/${order.user_id}/orders`,
    data: { order }
  });
};

export const fetchAllOrders = id => {
  return $.ajax({
    type: "GET",
    url: `api/users/${id}/orders`
  });
};
