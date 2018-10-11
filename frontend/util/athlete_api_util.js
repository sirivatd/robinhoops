export const fetchAthlete = id => {
  return $.ajax({
    url: `/api/athletes/${id}`,
    method: "GET"
  });
};
