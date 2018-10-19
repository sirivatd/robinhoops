import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class AthleteChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { datasets: [], labels: [] } };
  }

  componentDidMount() {
    if (this.props.graphOption) {
      $.ajax({
        url: `/api/athletes/${this.props.athleteId}/tweet_score_snapshots`,
        method: "GET"
      }).then(res => {
        let valuePoints = Object.values(res);
        let labels = [];
        let data = [];

        for (let i = 0; i < valuePoints.length; i++) {
          labels.push(valuePoints[i].created_at);
          data.push(valuePoints[i].score);
        }

        this.setState({
          data: {
            labels: labels,
            datasets: [
              {
                fill: false,
                borderColor: "#21ce99",
                strokeColor: "#21ce99",
                pointColor: "#21ce99",
                pointRadius: 0,
                pointStrokeColor: "#21ce99",
                pointHighlightFill: "#21ce99",
                data: data
              }
            ]
          }
        });
      });
    } else {
      $.ajax({
        url: `/api/athletes/${this.props.athleteId}/athlete_price_snapshots`,
        method: "GET"
      }).then(res => {
        let valuePoints = Object.values(res);
        let labels = [];
        let data = [];

        for (let i = 0; i < valuePoints.length; i++) {
          labels.push(valuePoints[i].created_at);
          data.push(valuePoints[i].price);
        }

        this.setState({
          data: {
            labels: labels,
            datasets: [
              {
                fill: false,
                borderColor: "#21ce99",
                strokeColor: "#21ce99",
                pointColor: "#21ce99",
                pointRadius: 0,
                pointStrokeColor: "#21ce99",
                pointHighlightFill: "#21ce99",
                data: data
              }
            ]
          }
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.graphOption) {
      $.ajax({
        url: `/api/athletes/${nextProps.athleteId}/tweet_score_snapshots`,
        method: "GET"
      }).then(res => {
        let valuePoints = Object.values(res);
        let labels = [];
        let data = [];

        for (let i = 0; i < valuePoints.length; i++) {
          labels.push(valuePoints[i].created_at);
          data.push(valuePoints[i].twitter_sentiment);
        }

        this.setState({
          data: {
            labels: labels,
            datasets: [
              {
                fill: false,
                borderColor: "#21ce99",
                strokeColor: "#21ce99",
                pointColor: "#21ce99",
                pointRadius: 0,
                pointStrokeColor: "#21ce99",
                pointHighlightFill: "#21ce99",
                data: data
              }
            ]
          }
        });
      });
    } else {
      $.ajax({
        url: `/api/athletes/${nextProps.athleteId}/athlete_price_snapshots`,
        method: "GET"
      }).then(res => {
        let valuePoints = Object.values(res);
        let labels = [];
        let data = [];

        for (let i = 0; i < valuePoints.length; i++) {
          labels.push(valuePoints[i].created_at);
          data.push(valuePoints[i].price);
        }

        this.setState({
          data: {
            labels: labels,
            datasets: [
              {
                fill: false,
                borderColor: "#21ce99",
                strokeColor: "#21ce99",
                pointColor: "#21ce99",
                pointRadius: 0,
                pointStrokeColor: "#21ce99",
                pointHighlightFill: "#21ce99",
                data: data
              }
            ]
          }
        });
      });
    }
    if (this.props.athleteId !== nextProps.athleteId) {
      if (nextProps.graphOption) {
        $.ajax({
          url: `/api/athletes/${nextProps.athleteId}/tweet_score_snapshots`,
          method: "GET"
        }).then(res => {
          let valuePoints = Object.values(res);
          let labels = [];
          let data = [];

          for (let i = 0; i < valuePoints.length; i++) {
            labels.push(valuePoints[i].created_at);
            data.push(valuePoints[i].score);
          }

          this.setState({
            data: {
              labels: labels,
              datasets: [
                {
                  fill: false,
                  borderColor: "#21ce99",
                  strokeColor: "#21ce99",
                  pointColor: "#21ce99",
                  pointRadius: 0,
                  pointStrokeColor: "#21ce99",
                  pointHighlightFill: "#21ce99",
                  data: data
                }
              ]
            }
          });
        });
      } else {
        $.ajax({
          url: `/api/athletes/${nextProps.athleteId}/athlete_price_snapshots`,
          method: "GET"
        }).then(res => {
          let valuePoints = Object.values(res);
          let labels = [];
          let data = [];

          for (let i = 0; i < valuePoints.length; i++) {
            labels.push(valuePoints[i].created_at);
            data.push(valuePoints[i].price);
          }

          this.setState({
            data: {
              labels: labels,
              datasets: [
                {
                  fill: false,
                  borderColor: "#21ce99",
                  strokeColor: "#21ce99",
                  pointColor: "#21ce99",
                  pointRadius: 0,
                  pointStrokeColor: "#21ce99",
                  pointHighlightFill: "#21ce99",
                  data: data
                }
              ]
            }
          });
        });
      }
    }
  }

  render() {
    return (
      <Line
        options={{
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }
            ]
          },
          annotations: [
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: 2000,
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 4,
              label: {
                enabled: false,
                content: "Test label"
              }
            }
          ],
          maintainAspectRatio: false
        }}
        data={this.state.data}
      />
    );
  }
}

export default AthleteChart;
