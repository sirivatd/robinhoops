import React from "react";

class AthleteStats extends React.Component {
  constructor(props) {
    super(props);
    this.findAthlete = this.findAthlete.bind(this);
    this.state = {
      athlete: {}
    };
  }

  findAthlete(athleteId) {
    let athlete = {};
    for (let i = 0; i < this.props.athletes.length; i++) {
      if (this.props.athletes[i].id === parseInt(athleteId)) {
        athlete = this.props.athletes[i];
      }
    }

    this.setState({
      athlete: athlete
    });
  }

  componentDidMount() {
    this.findAthlete(this.props.athleteId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.athleteId !== nextProps.athleteId) {
      this.findAthlete(nextProps.athleteId);
    }
  }

  render() {
    const athleteStats = () => (
      <div className="athlete-stats-content-section">
        <h3 className="athlete-stats-name">{this.state.athlete.name}</h3>
        <h3 className="athlete-stats-team">{this.state.athlete.team_name}</h3>
        <div className="athlete-stats-offense">
          <div className="athlete-stats-games-played">
            <h4 className="games-played-label">Games Played</h4>
            <h4 className="games-played-value">
              {this.state.athlete.games_played}
            </h4>
          </div>
          <div className="athlete-stats-points">
            <h4 className="athlete-points-label">Points/Game</h4>
            <h4 className="athlete-points-value">
              {this.state.athlete.points_per_game}
            </h4>
          </div>

          <div className="athlete-stats-fg-percentage">
            <h4 className="fg-percentage-label">Field Goal %</h4>
            <h4 className="fg-percentage-value">
              {this.state.athlete.field_goal_percentage}
            </h4>
          </div>

          <div className="athlete-stats-efficiency">
            <h4 className="efficiency-label">Efficiency Rating</h4>
            <h4 className="efficiency-value">
              {this.state.athlete.player_efficiency_rating}
            </h4>
          </div>
        </div>

        <div className="athlete-stats-defense">
          <div className="athlete-stats-rebounds">
            <h4 className="athlete-rebounds-label">Rebounds/Game</h4>
            <h4 className="athlete-rebounds-value">
              {this.state.athlete.rebounds_per_game}
            </h4>
          </div>

          <div className="athlete-stats-assists">
            <h4 className="athlete-assists-label">Assists/Game</h4>
            <h4 className="athlete-assists-value">
              {this.state.athlete.assists_per_game}
            </h4>
          </div>

          <div className="athlete-stats-steals">
            <h4 className="athlete-steals-label">Steals/Game</h4>
            <h4 className="athlete-steals-value">
              {this.state.athlete.steals_per_game}
            </h4>
          </div>

          <div className="athlete-stats-blocks">
            <h4 className="athlete-blocks-label">Blocks/Game</h4>
            <h4 className="athlete-blocks-value">
              {this.state.athlete.blocks_per_game}
            </h4>
          </div>
        </div>
      </div>
    );
    return (
      <div className="athlete-stats-container">
        {Object.values(this.state.athlete).length > 0 ? athleteStats() : null}
      </div>
    );
  }
}

export default AthleteStats;
