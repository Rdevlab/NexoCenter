import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import StudentList from "../../Constants/Studetns.json";

const classCounts = StudentList.reduce((counts, student) => {
  const currentClass = student.ClassJourny?.at(-1)?.ClassName?.trim();
  if (currentClass && currentClass !== "_") {
    counts.set(currentClass, (counts.get(currentClass) ?? 0) + 1);
  }
  return counts;
}, new Map());

const rankedClasses = [...classCounts]
  .map(([className, students]) => ({ className, students }))
  .sort((first, second) => second.students - first.students);
const classData = [
  ...rankedClasses.slice(0, 5),
  ...(rankedClasses.length > 5
    ? [
        {
          className: "Other",
          students: rankedClasses
            .slice(5)
            .reduce((total, item) => total + item.students, 0),
        },
      ]
    : []),
];
const colors = [
  "#34d399",
  "#38bdf8",
  "#fbbf24",
  "#fb7185",
  "#a78bfa",
  "#94a3b8",
];

const ClassesChart = () => {
  const assignedStudents = rankedClasses.reduce(
    (total, item) => total + item.students,
    0,
  );

  return (
    <section className="flex h-full min-h-[15rem] w-full min-w-0 flex-col rounded-lg border border-white/10 bg-gray-800/70 p-4 text-white">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">
            Students by class
          </h2>
          <p className="mt-1 text-xs text-white/45">Current enrollment</p>
        </div>
        <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white/60">
          {rankedClasses.length} classes
        </span>
      </div>

      <div className="min-h-0 flex-1">
        {classData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={classData}
              margin={{ top: 14, right: 4, bottom: 0, left: 0 }}
              barCategoryGap="28%"
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 5"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                dataKey="className"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) =>
                  value.length > 9 ? `${value.slice(0, 8)}…` : value
                }
                tick={{ fill: "#a1a1aa", fontSize: 9 }}
                interval={0}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.035)" }}
                contentStyle={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  backgroundColor: "#111827",
                  color: "#f8fafc",
                  fontSize: "12px",
                }}
                itemStyle={{ color: "#a7f3d0" }}
                formatter={(value) => [`${value} students`, "Enrollment"]}
              />
              <Bar dataKey="students" radius={[5, 5, 0, 0]} maxBarSize={28}>
                <LabelList
                  dataKey="students"
                  position="top"
                  fill="#d1fae5"
                  fontSize={10}
                />
                {classData.map((entry, index) => (
                  <Cell
                    key={entry.className}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/45">
            No current class assignments
          </div>
        )}
      </div>
      <p className="mt-2 text-[10px] text-white/35">
        {assignedStudents} students across current class assignments
      </p>
    </section>
  );
};

export default ClassesChart;
