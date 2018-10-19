import * as APIUtil from "../util/athlete_api_util";

export const RECEIVE_ALL_ATHLETES = "RECEIVE_ALL_ATHLETES";
export const RECEIVE_A_ATHLETE = "RECEIVE_A_ATHLETE";

export const receiveAllAthletes = athletes => {
  return {
    type: RECEIVE_ALL_ATHLETES,
    athletes: athletes
  };
};

export const receiveAthlete = athlete => {
  return {
    type: RECEIVE_ALL_ATHLETES,
    athlete: athlete
  };
};

// thunk action creators

export const fetchAllAthletes = () => dispatch => {
  return APIUtil.fetchAllAthletes().then(res =>
    dispatch(receiveAllAthletes(res))
  );
};
