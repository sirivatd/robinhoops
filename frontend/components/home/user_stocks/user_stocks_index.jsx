import React from "react";
import UserStocksItem from "./user_stocks_item";

const UserStocksIndex = props => {
  console.log(props);
  return (
    <ul className="user-stocks-card">
      {props.orders.map(order => (
        <UserStocksItem key={order.id} order={order} />
      ))}
    </ul>
  );
};

export default UserStocksIndex;
