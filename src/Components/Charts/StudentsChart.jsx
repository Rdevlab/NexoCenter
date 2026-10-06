import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import StudentList from "../../Constants/Studetns.json";

const feeCounts = StudentList.reduce(
  (counts, student) => {
    const currentJourney = student.ClassJourny?.at(-1);
    if (currentJourney?.feeState?.toLowerCase() === "paid") {
      counts.paid += 1;
    } else {
      counts.pending += 1;
    }
    return counts;
  },
  { paid: 0, pending: 0 },
);

const feeData = [
  { name: "Paid", value: feeCounts.paid, color: "#34d399" },
  { name: "Pending", value: feeCounts.pending, color: "#fbbf24" },
];
const paidPercentage = StudentList.length
  ? Math.round((feeCounts.paid / StudentList.length) * 100)
  : 0;

const StudentsChart = () => {
  return (
    <section className="flex h-full min-h-[17rem] w-full min-w-0 flex-col rounded-lg border border-white/10 bg-gray-800/70 p-4 text-white sm:p-5">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">
            Student overview
          </h2>
          <p className="mt-1 text-xs text-white/45">Current fee status</p>
        </div>
        <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white/60">
          {StudentList.length} students
        </span>
      </div>

      <div className="relative min-h-0 flex-1">
        {StudentList.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="62%"
                  outerRadius="82%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {feeData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} students`, name]}
                  contentStyle={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "8px",
                    backgroundColor: "#111827",
                    color: "#f8fafc",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#d1fae5" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-white">
                {paidPercentage}%
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-wide text-white/45">
                fees paid
              </span>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/45">
            No student records available
          </div>
        )}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-3">
        {feeData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-white/50">{entry.name}</span>
            <span className="ml-auto text-sm font-medium text-white/85">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentsChart;
