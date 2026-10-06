import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import TeacherList from "../../Constants/Teachers.json";

const TeachersChart = () => {
  const totalTeachers = TeacherList.length;
  const activeTeachers = TeacherList.filter(
    (teacher) => teacher.state === "Active",
  ).length;
  const activePercentage = totalTeachers
    ? Math.round((activeTeachers / totalTeachers) * 100)
    : 0;
  const teacherData = [
    {
      name: "Active teachers",
      value: activePercentage,
      fill: "#34d399",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col text-white">
      <div className="mb-1">
        <h2 className="text-sm font-medium text-white/80">Active teachers</h2>
        <p className="mt-1 text-xs text-white/40">Current faculty status</p>
      </div>

      <div className="relative min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="72%"
            outerRadius="92%"
            barSize={8}
            data={teacherData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              background={{ fill: "rgba(255,255,255,0.08)" }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-semibold text-white">
            {activePercentage}%
          </span>
          <span className="mt-1 text-xs text-white/45">
            {activeTeachers} of {totalTeachers} active
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeachersChart;
