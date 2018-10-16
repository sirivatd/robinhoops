import React from "react";
import { withRouter } from "react-router";

class AthleteShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllAthletes();
  }

  render() {
    console.log("Rendering");
    const athleteName = () => <h1>{this.props.athlete.name}</h1>;
    const loader = () => (
      <span className="cssload-loader">
        <span className="cssload-loader-inner" />
      </span>
    );
    console.log(this.props.athlete);
    return <div>{this.props.athlete ? athleteName() : loader()}</div>;
  }
}

export default withRouter(AthleteShow);
