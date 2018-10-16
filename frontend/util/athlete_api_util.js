export const fetchAthlete = id => {
  return $.ajax({
    url: `/api/athletes/${id}`,
    method: "GET"
  });
};

export const fetchAllAthletes = userId => {
  return $.ajax({
    url: `api/athletes`,
    method: "GET"
  });
};

export const fetchAthleteTweets = athleteId => {
  return $.ajax({
    url: `api/athletes/${athleteId}/tweets`,
    method: "GET"
  });
};
