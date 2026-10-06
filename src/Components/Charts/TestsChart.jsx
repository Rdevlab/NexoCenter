import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import StudentList from "../../Constants/Studetns.json";

const scoreByRound = new Map();
StudentList.forEach((student) => {
  (student.ClassJourny ?? []).forEach((journey) => {
    const round = journey.round?.trim();
    if (!round || round === "_") return;

    const scores = scoreByRound.get(round) ?? {
      middleTotal: 0,
      middleCount: 0,
      finalTotal: 0,
      finalCount: 0,
    };
    const middleScore = Number(journey.middleTestScore);
    const finalScore = Number(journey.finalTestScore);

    if (Number.isFinite(middleScore) && middleScore > 0) {
      scores.middleTotal += middleScore;
      scores.middleCount += 1;
    }
    if (Number.isFinite(finalScore) && finalScore > 0) {
      scores.finalTotal += finalScore;
      scores.finalCount += 1;
    }
    scoreByRound.set(round, scores);
  });
});

const scoreData = [...scoreByRound]
  .map(([round, scores]) => ({
    round,
    midterm: scores.middleCount
      ? Number((scores.middleTotal / scores.middleCount).toFixed(1))
      : 0,
    final: scores.finalCount
      ? Number((scores.finalTotal / scores.finalCount).toFixed(1))
      : 0,
  }))
  .sort((first, second) => first.round.localeCompare(second.round));
const scoredAssessmentCount = [...scoreByRound.values()].reduce(
  (total, scores) => total + scores.middleCount + scores.finalCount,
  0,
);

const TestsChart = () => {
  return (
    <section className="flex h-full min-h-[15rem] w-full min-w-0 flex-col rounded-lg border border-white/10 bg-gray-800/70 p-4 text-white">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">Test results</h2>
          <p className="mt-1 text-xs text-white/45">
            Average reported scores by round
          </p>
        </div>
        <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white/60">
          {scoredAssessmentCount} scored
        </span>
      </div>

      <div className="min-h-0 flex-1">
        {scoredAssessmentCount ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={scoreData}
              margin={{ top: 8, right: 8, bottom: 0, left: -20 }}
              barCategoryGap="30%"
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 5"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                dataKey="round"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 10 }}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 10 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.035)" }}
                formatter={(value, name) => [`${value} points`, name]}
                contentStyle={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  backgroundColor: "#111827",
                  color: "#f8fafc",
                  fontSize: "12px",
                }}
                itemStyle={{ color: "#a7f3d0" }}
                labelStyle={{ color: "#cbd5e1", marginBottom: "4px" }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                height={28}
                iconType="circle"
                iconSize={7}
                wrapperStyle={{ color: "#a1a1aa", fontSize: "10px" }}
              />
              <Bar
                dataKey="midterm"
                name="Midterm"
                fill="#34d399"
                radius={[4, 4, 0, 0]}
                maxBarSize={22}
              />
              <Bar
                dataKey="final"
                name="Final"
                fill="#38bdf8"
                radius={[4, 4, 0, 0]}
                maxBarSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/45">
            No scored assessments yet
          </div>
        )}
      </div>
      <p className="mt-2 text-[10px] text-white/35">
        Averages use nonzero values from stored test scores.
      </p>
    </section>
  );
};

export default TestsChart;
