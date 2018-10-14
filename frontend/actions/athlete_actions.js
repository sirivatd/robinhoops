import * as APIUtil from "../util/athlete_api_util";

export const RECEIVE_ALL_ATHLETES = "RECEIVE_ALL_ATHLETES";

export const receiveAllAthletes = athletes => {
  return {
    type: RECEIVE_ALL_ATHLETES,
    athletes: athletes
  };
};

// thunk action creatos

export const fetchAllAthletes = () => dispatch => {
  return APIUtil.fetchAllAthletes().then(res =>
    dispatch(receiveAllAthletes(res))
  );
};
