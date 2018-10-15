import React from "react";

const TopMoversIndexItem = ({ athlete, price }) => {
  const athleteDetail = () => (
    <div className="top-movers-detail">
      <h3 className="top-movers-name">{athlete.name}</h3>
      <h2 className="top-movers-team">{athlete.team_acronym.toUpperCase()}</h2>
      <h2 className="top-movers-price">${price.toFixed(2)}</h2>
    </div>
  );

  const athleteImg = () => (
    <div className="top-movers-img-container">
      <img className="top-movers-img" src={athlete.image_url} />
    </div>
  );
  return (
    <div className="top-movers-item">
      {athleteDetail()}
      {athleteImg()}
    </div>
  );
};

export default TopMoversIndexItem;
