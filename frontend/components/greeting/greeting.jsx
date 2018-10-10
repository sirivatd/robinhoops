import React from "react";
import { Link } from "react-router-dom";

const Greeting = ({ currentUser, logout }) => {
  $(document).ready(function() {
    console.log("The document is ready");
    $(".security-section").hover(function() {
      console.log("Hovered");
    });

    $("body").hover(function() {
      console.log("Hovering on body");
      $(".free-section").toggleClass("green");
    });
  });
  const sessionLinks = () => (
    <nav className="login-signup">
      <Link className="login-logout" to="/login">
        Log In
      </Link>
      <Link className="login-logout" to="/signup">
        Sign Up
      </Link>
    </nav>
  );

  const personalGreeting = () => (
    <hgroup className="header-group">
      <h2 className="header-name">Hi, {currentUser.first_name}!</h2>
      <button className="header-button" onClick={logout}>
        Log Out
      </button>
    </hgroup>
  );
  return (
    <div>
      <div className="fixed-nav-bar">
        <img
          className="logo-img"
          src="https://media.glassdoor.com/sqll/1167765/robinhood-squarelogo-1530549970728.png"
        />
        {currentUser ? personalGreeting() : sessionLinks()}
      </div>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-text animated fadeInUp">Investing,</h1>
          <br />
          <h1 className="hero-text animated fadeInUp delay-1s">Reimagined.</h1>
          <br />
          <h3 className="hero-description animated fadeInUp delay-2s">
            TradeBlitz lets you invest in top athletes for free.
          </h3>
          <button className="hero-button animated fadeInUp delay-3s">
            Sign Up
          </button>
        </div>

        <div className="hero-visual">
          <img
            className="hero-img animated fadeInDown delay-2s"
            src="https://venturebeat.com/wp-content/uploads/2015/12/robinhood-animated.gif?resize=322%2C642&strip=all"
          />
        </div>
      </section>
      <section className="free-section">
        <div className="free-visual">
          <video autoPlay loop className="free-img" data-vscid="ggqk0uytb">
            <source src="https://d2ue93q3u507c2.cloudfront.net/assets/marketing/images/home_redesign/Android_trading.mp4" />
          </video>
        </div>

        <div className="free-content">
          <h2 className="free-text">Invest for free.</h2>
          <h3 className="free-description">
            We believe that the financial system should
          </h3>
          <br />
          <h3 className="free-description">
            work for the rest of us, not just the wealthy.
          </h3>
          <br />
          <br />
          <h3 className="free-description">
            We've cut the fat that makes other
          </h3>
          <br />
          <h3 className="free-description">
            brokerages costly, like manual account
          </h3>
          <br />
          <h3 className="free-description">
            management and hundreds of storefront
          </h3>
          <br />
          <h3 className="free-description">
            locations, so we can offer zero commission trading
          </h3>
          <img src="" />
        </div>
      </section>

      <section className="design-section">
        <div className="design-content">
          <h2 className="design-text">No manual needed.</h2>
          <h3 className="design-description">
            We've designed TradeBlitz from the ground up{" "}
          </h3>
          <br />
          <h3 className="design-description">
            for the next generation of newcomers and{" "}
          </h3>
          <br />
          <h3 className="design-description">experts alike. </h3>
          <br />
          <br />
          <h3 className="design-description">
            It's fast, dead simple and just works.{" "}
          </h3>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <img
            className="quote-image"
            src="http://laurabrunolilly.com/wp-content/uploads/2014/05/Quote-symbol-e1399901399587.png"
          />
          <br />
          <p className="testimony-text">
            Great app, easy to use. Intuitive interface.
          </p>
          <br />
          <p className="author-name">Katie from Milwaukee, WI</p>
        </div>

        <div className="design-visual">
          <img
            className="design-img"
            src="https://d2ue93q3u507c2.cloudfront.net/assets/marketing/images/home_redesign/PhoneGrid.png"
          />
        </div>
      </section>

      <section className="security-section">
        <div className="security-content">
          <img
            className="lock-icon"
            src="https://www.iconsdb.com/icons/preview/white/lock-xxl.png"
          />
          <br />
          <br />
          <h2 className="security-text">Trusted by Millions in the USA</h2>
          <h3 className="security-description">
            We're serious about security and use cutting-edge technology to
            ensure your
          </h3>
          <br />
          <h3 className="security-description">
            personal information is fully encrypted and securely stored.
          </h3>
          <br />
          <br />
          <h3 className="security-description">
            TradeBlitz is a member of SPIC, which means securities in your
          </h3>
          <br />
          <h3 className="security-description">
            account are protected up to $500,000. For details, please see
            www.spic.org.
          </h3>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <footer>
        <hr />
        <a href="mailto:don@sirivat.com">
          <img
            className="footer-icon"
            src="https://image.flaticon.com/icons/svg/59/59965.svg"
            alt="email-icon"
          />
        </a>
        <a href="https://www.instagram.com/donsirivat">
          <img
            className="footer-icon"
            src="https://image.freepik.com/free-icon/instagram-social-network-logo-of-photo-camera_318-64651.jpg"
            alt="instagram-icon"
          />
        </a>
        <a href="https://www.facebook.com/don.sirivat">
          <img
            className="footer-icon"
            src="https://image.freepik.com/free-icon/facebook-logo_318-49940.jpg"
            alt="facebook-icon"
          />
        </a>
        <a href="https://www.linkedin.com/in/donsirivat/">
          <img
            className="footer-icon"
            src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-linkedin-3.png"
            alt="linkedin-icon"
          />
        </a>

        <hr />
        <p className="footer-text">
          Created by Don Sirivat
          <br />
          <br />
          Inspired by Robinhood.com
        </p>
      </footer>
    </div>
  );
};

export default Greeting;
