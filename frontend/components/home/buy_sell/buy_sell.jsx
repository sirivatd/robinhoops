import React from "react";

class BuySell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="buy-sell-content-section">
        <ul className="buy-sell-options-list">
          <li className="buy-order-option">Buy</li>
          <li className="sell-order-option">Sell</li>
        </ul>
        <hr className="order-options-break-line" />
        <div className="stock-info-section">
          <div className="stock-num-shares-section">
            <label className="shares-label">
              Shares
              <input type="text" className="shares-num-input" />
            </label>
          </div>
          <div className="stock-price-section">
            <label className="price-label">
              Market Price
              <h3 className="stock-price-value">$28.73</h3>
            </label>
          </div>

          <hr className="estimated-cost-break-line" />
          <label className="estimated-cost-credit-label">
            Estimated Cost
            <h3 className="estimated-cost-credit-value">$0.00</h3>
          </label>
          <button className="order-submit-button">Place Order</button>
          <hr className="buying-power-break-line" />
          <h3 className="buying-power-shares-available">
            $2000.00 Buying Power Available
          </h3>
        </div>
      </div>
    );
  }
}

export default BuySell;
