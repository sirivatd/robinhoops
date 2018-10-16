export const createOrder = order => {
  return $.ajax({
    type: "POST",
    url: `api/users/${order.user_id}/orders`,
    data: { order }
  });
};

export const updateOrder = (userId, orderId) => {
  return $.ajax({
    type: "PATCH",
    url: `api/users/${userId}/orders/${orderId}`,
    data: {}
  });
};

export const fetchAllOrders = id => {
  return $.ajax({
    type: "GET",
    url: `api/users/${id}/orders`
  });
};
