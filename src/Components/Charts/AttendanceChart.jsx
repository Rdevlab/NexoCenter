import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  { round: "Round A", presence: 1000 },
  { round: "Round B", presence: 100 },
  { round: "Round C", presence: 100 },
  { round: "Round D", presence: 100 },
  { round: "Round E", presence: 100 },
  { round: "Round F", presence: 100 },
];

const AttendanceChart = () => {
  return (
    <div className="w-full h-full rounded-2xl duration-500">
      <div className="mb-14">
        <h2 className="text-lg font-semibold">Attendance Rate</h2>
        <p className="text-sm">This month's Attendance Rate</p>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="pinkGradient" x1="0" y1="0" x2="0 " y2="1">
              <stop offset="0%" stopColor="#ec4899" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="round"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 5px 20px rgba(209, 27, 27, 0.08)",
              backgroundColor: "rgba(1, 0, 3, 0.77)",
              color: "gray",
            }}
          />

          <Area
            type="monotone"
            dataKey="presence"
            stroke="#af2525"
            strokeWidth={3}
            fill="url(#pinkGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
