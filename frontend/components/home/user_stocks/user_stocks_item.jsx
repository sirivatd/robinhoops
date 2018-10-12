import React from "react";
import { Link } from "react-router-dom";

const UserStocksItem = ({ order }) => (
  <li className="order-index-item">
    <h3 className="user-stocks-item-price">${order.purchase_price}</h3>
  </li>
);

export default UserStocksItem;
