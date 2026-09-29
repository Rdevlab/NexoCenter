import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
const teacherData = [
  {
    name: "Teachers",
    value: 75,
    fill: "#22c55e",
  },
];
const TeachersChart = () => {
  return (
    <div className="w-full h-full rounded-2xl duration-500">
      <div className="mb-2">
        <h2 className="text-lg font-semibold">Teachers</h2>
      </div>

      <div className="relative h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={3}
            data={teacherData}
            startAngle={90}
            endAngle={-190}
          >
            <RadialBar background dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-bold text-slate-800">75%</span>
          <span className="text-sm text-slate-400">Active</span>
        </div>
      </div>
    </div>
  );
};

export default TeachersChart;
