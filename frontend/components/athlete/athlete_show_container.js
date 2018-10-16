import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import AthleteShow from "./athlete_show.jsx";

const mapStateToProps = (
  { session, entities: { athletes, users } },
  ownProps
) => {
  return {
    athletes: Object.values(athletes),
    currentUser: users[session.id]
  };
};

export default connect(
  mapStateToProps,
  null
)(AthleteShow);
