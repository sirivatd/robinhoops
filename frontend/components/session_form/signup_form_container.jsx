import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import {
  signup,
  receiveErrors,
  receiveFirstUser
} from "../../actions/session_actions";
import SessionForm from "./session_form";
import SignUpForm from "./signup_form";

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "signup",
    navLink: (
      <Link className="demo-link" to="">
        Try the demo
      </Link>
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: user => dispatch(signup(user)),
    receiveErrors: errors => dispatch(receiveErrors(errors)),
    receiveFirstUser: () => dispatch(receiveFirstUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
