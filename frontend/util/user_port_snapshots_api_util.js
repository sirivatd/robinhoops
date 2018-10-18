export const createUserPortSnapshot = snapshot => {
  return $.ajax({
    method: "POST",
    url: `/api/users/${snapshot.user_id}/users_port_snapshots`,
    data: { snapshot: snapshot }
  });
};
