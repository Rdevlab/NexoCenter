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
  { month: "Month 1", income: 28 },
  { month: "Month 2", income: 35 },
  { month: "Month 3", income: 30 },
  { month: "Month 4", income: 42 },
  { month: "Month 5", income: 38 },
  { month: "Month 6", income: 45 },
  { month: "Month 7", income: 45 },
  { month: "Month 8", income: 45 },
  { month: "Month 9", income: 45 },
  { month: "Month 10", income: 45 },
  { month: "Month 11", income: 45 },
  { month: "Month 12", income: 45 },
];
const colors = [
  "#0a0b44",
  "#080dff",
  "#e40b00",
  "#ec4899",
  "#22c55e",
  "#03a7f9",
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

const PayementsChart = (props) => {
  return (
    <div className={`${props.w} h-full rounded-2xl shrink-0 duration-500`}>
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Payments overview</h2>
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
              dataKey="month"
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
              formatter={(value) => [`${value} Afs`, "Income"]}
            />

            <Bar dataKey="income" barSize={35} shape={<CustomShapeBar />}>
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

export default PayementsChart;
