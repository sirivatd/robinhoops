import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from "react-vis";

class HomeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { x: 0, y: 8 },
        { x: 1, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 9 },
        { x: 4, y: 1 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
        { x: 7, y: 3 },
        { x: 8, y: 2 },
        { x: 9, y: 0 }
      ]
    };
  }

  render() {
    return (
      <XYPlot width={800} height={300}>
        <HorizontalGridLines />
        <LineSeries
          data={this.state.data}
          color={"#21ce99"}
          style={{ strokeWidth: 2 }}
        />

        <XAxis />
        <YAxis />
      </XYPlot>
    );
  }
}

export default HomeChart;
