import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import AthleteShow from "./athlete_show.jsx";
import { fetchAllAthletes } from "./../../actions/athlete_actions";

const mapStateToProps = (
  { session, entities: { athletes, users } },
  ownProps
) => {
  return {
    athlete: athletes[ownProps.match.params.athleteId],
    currentUser: users[session.id]
  };
};

const mDP = dispatch => ({
  fetchAllAthletes: () => dispatch(fetchAllAthletes())
});

export default connect(
  mapStateToProps,
  mDP
)(AthleteShow);
