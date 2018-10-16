import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import { Route, Redirect, Switch, Link, HashRouter } from "react-router-dom";
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import HomeContainer from "./home/home_container";
import NotFound from "./not_found";
import FreeStockContainer from "./free_stock/free_stock_container";
import AthleteShowContainer from "./athlete/athlete_show_container";

const App = () => (
  <div>
    <header>
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Sans"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto:700"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:500"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:300|Poppins:300|Source+Sans+Pro:600"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Knewave|Monoton|Orbitron"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Mukta"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Barlow:300|Biryani"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Prompt:300"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-vis/dist/style.css"
      />
    </header>
    <Switch>
      <ProtectedRoute exact path="/home" component={HomeContainer} />
      <ProtectedRoute
        exact
        path="/:user_id/free-stock"
        component={FreeStockContainer}
      />

      <AuthRoute exact path="/" component={GreetingContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute
        path="/athletes/:athleteId"
        component={AthleteShowContainer}
      />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
