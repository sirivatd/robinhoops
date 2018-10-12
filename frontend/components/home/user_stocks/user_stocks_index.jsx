import React from "react";
import UserStocksItem from "./user_stocks_item";

const UserStocksIndex = props => {
  console.log(props);
  return (
    <ul className="user-stocks-card">
      <h2 className="user-stocks-title">Stocks</h2>
      <hr className="user-stocks-break-line" />
      {props.orders.map(order => (
        <UserStocksItem key={order.id} order={order} />
      ))}
    </ul>
  );
};

export default UserStocksIndex;
