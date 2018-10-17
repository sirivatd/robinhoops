export const login = user =>
  $.ajax({
    method: "POST",
    url: "/api/session",
    data: { user }
  });

export const signup = user => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user }
  });
};

export const logout = () =>
  $.ajax({
    method: "DELETE",
    url: "/api/session"
  });

export const updateUser = (userId, buyingPower) =>
  $.ajax({
    method: "PATCH",
    url: `/api/users/${userId}`,
    data: { user: { buying_power: buyingPower } }
  });
