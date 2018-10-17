import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  REMOVE_FIRST_USER,
  RECEIVE_FIRST_USER
} from "../actions/session_actions";
import merge from "lodash/merge";

const _nullUser = Object.freeze({
  id: null,
  firstTime: false
});

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { id: action.currentUser.id });
    case LOGOUT_CURRENT_USER:
      return merge({}, state, _nullUser);
    case REMOVE_FIRST_USER:
      return merge({}, state, { firstTime: false });
    case RECEIVE_FIRST_USER:
      return merge({}, state, { firstTime: true });
    default:
      return state;
  }
};

export default sessionReducer;
