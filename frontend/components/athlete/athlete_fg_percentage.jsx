import { PieChart, Pie, Sector, Cell } from "recharts";

import React from "react";

const AthleteFGPercentage = ({ fg_percentage, athletes }) => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 }
  ];
  const COLORS = ["#21ce99", "#1ae9aa"];
  const RADIAN = Math.PI / 180;
  const radialChart = () => (
    <PieChart width={100} height={100}>
      <Pie
        data={data}
        cx={120}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
      >
        {data.map((entry, index) => (
          <Cell fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );

  const loader = () => (
    <span className="cssload-loader">
      <span className="cssload-loader-inner" />
    </span>
  );

  return (
    <div className="athlete-fg-chart">
      {Object.values(athletes).length > 0 ? radialChart() : loader()}
    </div>
  );
};

export default AthleteFGPercentage;
