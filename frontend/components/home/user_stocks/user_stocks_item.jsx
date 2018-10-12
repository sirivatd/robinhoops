import React from "react";
import { Link } from "react-router-dom";
import { fetchAthlete } from "./../../../util/athlete_api_util";
import { fetchStock } from "./../../../util/stock_api_util";

class UserStocksItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      athlete: {},
      stock: {}
    };
  }

  componentDidMount() {
    this.setState({ order: this.props.order });
    fetchStock(this.props.order.stock_id).then(res => {
      this.setState({ stock: res });
      fetchAthlete(Object.values(this.state.stock)[0].athlete_id).then(
        athlete => this.setState({ athlete: athlete })
      );
    });
  }

  render() {
    const athlete = Object.values(this.state.athlete)[0];
    console.log(athlete);

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
        ${this.state.order.purchase_price.toFixed(2)}
      </h3>
    );
    return (
      <li className="order-index-item">
        {Object.values(this.state.athlete).length > 0
          ? athleteImage()
          : loader()}
        {Object.values(this.state.athlete).length > 0
          ? athleteName()
          : loader()}

        {Object.values(this.state.stock).length > 0 ? itemPrice() : loader()}
      </li>
    );
  }
}

export default UserStocksItem;
