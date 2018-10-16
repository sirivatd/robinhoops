import React from "react";
import { withRouter } from "react-router-dom";

const TopMoversIndexItem = ({ athlete, price, history }) => {
  const athleteDetail = () => (
    <div className="top-movers-detail">
      <h3 className="top-movers-name">{athlete.name}</h3>
      <h2 className="top-movers-team">{athlete.team_acronym.toUpperCase()}</h2>
      <h2 className="top-movers-price">${price.toFixed(2)}</h2>
    </div>
  );

  const loader = () => (
    <span className="cssload-loader">
      <span className="cssload-loader-inner" />
    </span>
  );
  const athleteImg = () => (
    <div className="top-movers-img-container">
      <img className="top-movers-img" src={athlete.image_url} />
    </div>
  );
  return (
    <div
      onClick={() => history.push(`/athletes/${athlete.id}`)}
      className="top-movers-item"
    >
      {athlete ? athleteDetail() : loader()}
      {athlete ? athleteImg() : loader()}
    </div>
  );
};

export default withRouter(TopMoversIndexItem);
