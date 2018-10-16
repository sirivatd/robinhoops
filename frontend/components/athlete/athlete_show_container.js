import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import AthleteShow from "./athlete_show.jsx";
import { fetchAllAthletes } from "./../../actions/athlete_actions";
import { logout } from "../../actions/session_actions";

const mapStateToProps = (
  { session, entities: { athletes, users, orders } },
  ownProps
) => {
  return {
    athlete: athletes[ownProps.match.params.athleteId],
    currentUser: users[session.id],
    athletes: Object.values(athletes),
    orders: Object.values(orders)
  };
};

const mDP = dispatch => ({
  fetchAllAthletes: () => dispatch(fetchAllAthletes()),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mDP
)(AthleteShow);
