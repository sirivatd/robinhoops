import React from "react";
import CountUp from "react-countup";

class BuySell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
      numShares: 0,
      estimatedCost: 0
    };
    this.optionsClicked = this.optionsClicked.bind(this);
    this.findStock = this.findStock.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.findStock(this.props.athleteId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.athleteId !== nextProps.ahleteId) {
      this.findStock(nextProps.athleteId);
    }
  }

  findStock(athleteId) {
    for (let i = 0; i < this.props.stocks.length; i++) {
      if (this.props.stocks[i].athlete_id === this.props.athleteId) {
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
  }

  render() {
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
              />
            </label>
          </div>
          {Object.values(this.state.stock).length > 0
            ? stockPriceSection()
            : loader()}

          <hr className="estimated-cost-break-line" />
          <label className="estimated-cost-credit-label">
            Estimated Cost
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
          </label>
          <button className="order-submit-button">Place Order</button>
          <hr className="buying-power-break-line" />
          <h3 className="buying-power-shares-available">
            <CountUp
              start={0}
              end={this.props.currentUser.buying_power}
              duration={5}
              separator=","
              decimals={2}
              decimal="."
              prefix="$"
            />{" "}
            Buying Power Available
          </h3>
        </div>
      </div>
    );
  }
}

export default BuySell;
