import React from "react";
import CountUp from "react-countup";
import { withRouter } from "react-router-dom";
import { updateUser } from "./../../../util/session_api_util";

class BuySell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
      numShares: "",
      estimatedCost: 0,
      ownedShares: 0,
      orderType: true,
      orders: {}
    };
    this.optionsClicked = this.optionsClicked.bind(this);
    this.findStock = this.findStock.bind(this);
    this.update = this.update.bind(this);
    this.orderSubmitted = this.orderSubmitted.bind(this);
    this.calculateOwnedShares = this.calculateOwnedShares.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllOrders();
    this.findStock(this.props.athleteId);
    this.setState(
      {
        orders: this.props.orders
      },
      () => this.calculateOwnedShares()
    );
  }

  componentWillReceiveProps(nextProps) {
    // if (Object.values(this.state.stock).length > 0) {
    //   this.calculateOwnedShares();
    //   this.findStock(nextProps.athleteId);
    // }
    if (this.props.athleteId !== nextProps.athleteId) {
      this.findStock(nextProps.athleteId);
      this.setState(
        {
          stocks: nextProps.stocks
        },
        () => this.calculateOwnedShares() //   this.calculateOwnedShares();
      );
    }
  }

  calculateOwnedShares() {
    let boughtShares = 0;
    let soldShares = 0;

    for (let i = 0; i < this.state.orders.length; i++) {
      if (parseInt(this.state.orders[i].stock_id) === this.state.stock.id) {
        if (this.state.orders[i].order_type === "BUY") {
          boughtShares += this.state.orders[i].num_share;
        } else {
          soldShares += this.state.orders[i].num_share;
        }
      }
    }

    this.setState({
      ownedShares: boughtShares - soldShares
    });
  }

  findStock(athleteId) {
    for (let i = 0; i < this.props.stocks.length; i++) {
      if (this.props.stocks[i].athlete_id === athleteId) {
        this.setState({
          stock: this.props.stocks[i]
        });
      }
    }
  }

  update(field) {
    return e => {
      if (e.currentTarget.value !== "") {
        let numShares = parseInt(e.currentTarget.value);
        this.setState({
          [field]: numShares
        });
      }
      if (e.currentTarget.value !== "" && parseInt(e.currentTarget.value) >= 0)
        this.setState({
          estimatedCost:
            parseInt(e.currentTarget.value) * this.state.stock.current_price
        });
    };
  }

  optionsClicked(e) {
    e.preventDefault();
    const currentOption = document.getElementsByClassName(
      "options-selected"
    )[0];
    if (currentOption.contains(e.target)) {
      return;
    }
    const buyOption = document.getElementsByClassName("buy-order-option")[0];
    const sellOption = document.getElementsByClassName("sell-order-option")[0];
    buyOption.classList.toggle("options-selected");
    sellOption.classList.toggle("options-selected");
    this.setState({
      orderType: !this.state.orderType
    });
  }

  orderSubmitted() {
    let orderType = "BUY";
    if (this.state.orderType === false) {
      orderType = "SELL";
    }

    // check for valid order
    if (orderType === "BUY") {
      if (this.state.estimatedCost > this.props.currentUser.buying_power) {
        alert("Insufficient funds to complete this transaction");
        return;
      }
    }

    if (orderType === "SELL") {
      if (parseInt(this.state.numShares) > this.state.ownedShares) {
        alert("You cannot sell more shares than you own");
        return;
      }
    }

    if (
      parseInt(this.state.numShares) === 0 ||
      this.state.numShares === "" ||
      parseInt(this.state.numShares) < 0
    ) {
      alert("There was a problem completing your order");
      return;
    }

    const newOrder = {
      num_share: parseInt(this.state.numShares),
      user_id: this.props.currentUser.id,
      stock_id: this.state.stock.id,
      purchase_price: this.state.stock.current_price,
      order_type: orderType
    };

    if (orderType === "BUY") {
      this.props.currentUser.buying_power -= this.state.estimatedCost;
    } else {
      this.props.currentUser.buying_power += this.state.estimatedCost;
    }

    this.props.createOrder(newOrder);
    updateUser(
      this.props.currentUser.id,
      this.props.currentUser.buying_power
    ).then(res => {
      this.props.receiveCurrentUser(res);
    });
    this.props.history.push("/");
  }

  render() {
    // debugger
    const loader = () => (
      <span className="cssload-loader">
        <span className="cssload-loader-inner" />
      </span>
    );
    const stockPriceSection = () => (
      <div className="stock-price-section">
        <label className="price-label">
          Market Price
          <h3 className="stock-price-value">
            ${this.state.stock.current_price.toFixed(2)}
          </h3>
        </label>
      </div>
    );

    const buySection = () => (
      <div className="estimated-cost-credit">
        <h2 className="estimated-cost-credit-label">Estimated Cost</h2>
        <h3 className="estimated-cost-credit-value">
          <CountUp
            start={this.state.estimatedCost}
            end={this.state.estimatedCost}
            separator=","
            decimals={2}
            decimal="."
            prefix="$"
          />
        </h3>
      </div>
    );

    const sellSection = () => (
      <div className="estimated-cost-credit">
        <h2 className="estimated-cost-credit-label">Estimated Credit</h2>
        <h3 className="estimated-cost-credit-value">
          <CountUp
            start={this.state.estimatedCost}
            end={this.state.estimatedCost}
            separator=","
            decimals={2}
            decimal="."
            prefix="$"
          />
        </h3>
      </div>
    );

    const buyingPowerSection = () => (
      <h3 className="buying-power-shares-available">
        <CountUp
          start={this.props.currentUser.buying_power}
          end={this.props.currentUser.buying_power}
          duration={5}
          separator=","
          decimals={2}
          decimal="."
          prefix="$"
        />{" "}
        Buying Power Available
      </h3>
    );

    const sellingSharesSection = () => (
      <h3 className="buying-power-shares-available">
        <CountUp
          start={this.state.ownedShares}
          end={this.state.ownedShares}
          duration={5}
          separator=","
          decimals={0}
          decimal="."
          prefix=""
        />{" "}
        Shares Available
      </h3>
    );

    return (
      <div className="buy-sell-content-section">
        <ul className="buy-sell-options-list">
          <li
            className="buy-order-option options-selected"
            onClick={this.optionsClicked}
          >
            Buy
          </li>
          <li className="sell-order-option" onClick={this.optionsClicked}>
            Sell
          </li>
        </ul>
        <hr className="order-options-break-line" />
        <div className="stock-info-section">
          <div className="stock-num-shares-section">
            <label className="shares-label">
              Shares
              <input
                type="number"
                onChange={this.update("numShares")}
                className="shares-num-input"
                value={this.state.numShares}
                min="0"
                placeholder="0"
              />
            </label>
          </div>
          {Object.values(this.state.stock).length > 0
            ? stockPriceSection()
            : loader()}

          <hr className="estimated-cost-break-line" />
          {this.state.orderType ? buySection() : sellSection()}
          <button className="order-submit-button" onClick={this.orderSubmitted}>
            Place Order
          </button>
          <hr className="buying-power-break-line" />
          {this.state.orderType ? buyingPowerSection() : sellingSharesSection()}
        </div>
      </div>
    );
  }
}

export default withRouter(BuySell);
