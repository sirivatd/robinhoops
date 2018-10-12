export const createOrder = order => {
  return $.ajax({
    type: "POST",
    url: `api/users/${order.user_id}/orders`,
    data: { order }
  });
};
