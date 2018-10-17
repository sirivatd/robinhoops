import React from "react";
import { Link, withRouter } from "react-router-dom";

const UserStocksItem = ({ athlete, stock, history }) => {
  const athleteName = () => (
    <div className="order-index-item-athlete-info">
      <h3 className="order-index-item-athlete-name">{athlete.name}</h3>
      <h4 className="order-index-item-athlete-team">{athlete.team_name}</h4>
    </div>
  );

  const athleteImage = () => (
    <img className="order-index-item-img" src={athlete.image_url} />
  );

  const loader = () => (
    <span className="cssload-loader">
      <span className="cssload-loader-inner" />
    </span>
  );

  const itemPrice = () => (
    <h3 className="user-stocks-item-price">
      ${stock.current_price.toFixed(2)}
    </h3>
  );
  return (
    <li
      onClick={() => history.push(`/athletes/${athlete.id}`)}
      className="order-index-item"
    >
      {Object.values(athlete).length > 0 ? athleteImage() : loader()}
      {Object.values(athlete).length > 0 ? athleteName() : null}

      {Object.values(athlete).length > 0 ? itemPrice() : null}
    </li>
  );
};

export default withRouter(UserStocksItem);
