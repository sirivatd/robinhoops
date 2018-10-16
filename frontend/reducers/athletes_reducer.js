import merge from "lodash/merge";

import {
  RECEIVE_ALL_ATHLETES,
  RECEIVE_A_ATHLETE
} from "../actions/athlete_actions";

const athletesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_ATHLETES:
      return merge({}, state, action.athletes);
    case RECEIVE_A_ATHLETE:
      return merge({}, state, action.athlete);
    default:
      return state;
  }
};

export default athletesReducer;
