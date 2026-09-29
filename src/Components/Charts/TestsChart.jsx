import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
const classData = [
  { className: "Round A", Scores: 28 },
  { className: "Round B", Scores: 35 },
  { className: "Round C", Scores: 30 },
  { className: "Round D", Scores: 42 },
  { className: "Round E", Scores: 38 },
  { className: "Round F", Scores: 45 },
];
const colors = [
  "#22c55e",
  "#ec4899",
  "#22c55e",
  "#ec4899",
  "#22c55e",
  "#ec4899",
];
const CustomShapeBar = (props) => {
  const { x, y, width, height, fill } = props;

  return (
    <path
      d={`
        M ${x + 10},${y}
        L ${x + width - 10},${y}
        Q ${x + width},${y} ${x + width},${y + 10}
        L ${x + width},${y + height}
        L ${x},${y + height}
        L ${x},${y + 10}
        Q ${x},${y} ${x + 10},${y}
        Z
      `}
      fill={fill}
    />
  );
};

const TestsChart = () => {
  return (
    <div className="w-full h-full rounded-2xl duration-500">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Tests Rate</h2>
      </div>

      {/* Chart */}
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={classData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#9fa6af"
            />

            <XAxis
              dataKey="className"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
            />

            <Tooltip
              cursor={{ fill: "#f8fafc00" }}
              contentStyle={{
                border: "none",
                borderRadius: "12px",
                backgroundColor: "green",
                boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [`${value} Scores`, "Class"]}
            />

            <Bar dataKey="Scores" barSize={35} shape={<CustomShapeBar />}>
              {classData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TestsChart;
