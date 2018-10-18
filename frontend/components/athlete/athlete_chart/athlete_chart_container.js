import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import AthleteChart from "./athlete_chart";

const mapStateToProps = (props, ownProps) => {
  debugger;
  return {
    currentUser: ownProps.currentUser,
    athleteId: ownProps.athleteId
  };
};

export default connect(
  mapStateToProps,
  null
)(AthleteChart);
