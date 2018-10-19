import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import AthleteChart from "./athlete_chart";

const mapStateToProps = (props, ownProps) => {
  return {
    currentUser: ownProps.currentUser,
    athleteId: ownProps.athleteId,
    graphOption: ownProps.graphOption
  };
};

export default connect(
  mapStateToProps,
  null
)(AthleteChart);
