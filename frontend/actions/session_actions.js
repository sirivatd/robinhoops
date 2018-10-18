import * as APIUtil from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_FIRST_USER = "RECEIVE_FIRST_USER";
export const REMOVE_FIRST_USER = "REMOVE_FIRST_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";

// Regular action creators

export const receiveFirstUser = () => ({
  type: RECEIVE_FIRST_USER,
  firstUser: true
});

export const removeFirstUser = () => ({
  type: REMOVE_FIRST_USER,
  firstUser: false
});

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// Thunk action creators

export const signup = user => dispatch =>
  APIUtil.signup(user).then(
    user => dispatch(receiveCurrentUser(user)),
    err => dispatch(receiveErrors(err.responseJSON))
  );

export const login = user => dispatch =>
  APIUtil.login(user).then(
    user => dispatch(receiveCurrentUser(user)),
    err => dispatch(receiveErrors(err.responseJSON))
  );

export const logout = () => dispatch =>
  APIUtil.logout().then(user => dispatch(logoutCurrentUser()));

export const removeUser = () => dispatch => dispatch(removeCurrentUser());
