import React from "react";
import { withRouter } from "react-router";

class AthleteShow extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      athlete: this.props.athletes[this.props.match.params.athleteId]
    };
  }

  componentDidMount() {}

  render() {
    const athleteName = () => <h1>{this.state.athlete.name}</h1>;
    const loader = () => (
      <span className="cssload-loader">
        <span className="cssload-loader-inner" />
      </span>
    );
    return (
      <div>
        {Object.values(this.props.athletes.length) > 0
          ? athleteName()
          : loader()}
      </div>
    );
  }
}

export default withRouter(AthleteShow);
