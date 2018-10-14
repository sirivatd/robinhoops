import merge from "lodash/merge";

import { RECEIVE_ALL_ATHLETES } from "../actions/athlete_actions";

const athletesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_ATHLETES:
      return merge({}, state, action.athletes);
    default:
      return state;
  }
};

export default athletesReducer;
