import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class HomeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { datasets: [], labels: [] } };
  }

  componentDidMount() {
    $.ajax({
      url: `/api/users/${this.props.currentUser.id}/users_port_snapshots`,
      method: "GET"
    }).then(res => {
      let snapshotPoints = Object.values(res);
      let labels = [];
      let data = [];

      for (let i = 0; i < snapshotPoints.length; i++) {
        labels.push(snapshotPoints[i].created_at);
        data.push(snapshotPoints[i].port_value);
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

export default HomeChart;
