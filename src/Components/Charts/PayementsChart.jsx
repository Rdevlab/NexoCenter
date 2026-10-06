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

const formatAmount = (amount) =>
  `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount)} Afs`;

const roundTotals = new Map();
StudentList.forEach((student) => {
  (student.ClassJourny ?? []).forEach((journey) => {
    const round = journey.round?.trim() || "Unassigned";
    const totals = roundTotals.get(round) ?? {
      billed: 0,
      collected: 0,
      outstanding: 0,
    };
    const amount = Number(journey.fee) || 0;
    totals.billed += amount;
    if (journey.feeState?.toLowerCase() === "paid") {
      totals.collected += amount;
    } else {
      totals.outstanding += amount;
    }
    roundTotals.set(round, totals);
  });
});

const paymentData = [...roundTotals]
  .map(([round, totals]) => ({ round, ...totals }))
  .sort((first, second) => first.round.localeCompare(second.round));
const totalCollected = paymentData.reduce(
  (total, round) => total + round.collected,
  0,
);
const totalOutstanding = paymentData.reduce(
  (total, round) => total + round.outstanding,
  0,
);

const PayementsChart = (props) => {
  return (
    <section
      className={`${props.w} flex h-full min-h-[18rem] min-w-0 shrink-0 flex-col rounded-lg border border-white/10 bg-gray-800/70 p-4 text-white duration-300`}
    >
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">
            Payments overview
          </h2>
          <p className="mt-1 text-xs text-white/45">
            Student fee collection by round
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-md border border-emerald-300/15 bg-emerald-300/[0.06] px-2.5 py-1.5 text-emerald-200">
            Collected {formatAmount(totalCollected)}
          </span>
          <span className="rounded-md border border-amber-300/15 bg-amber-300/[0.06] px-2.5 py-1.5 text-amber-100">
            Due {formatAmount(totalOutstanding)}
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        {paymentData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={paymentData}
              layout="vertical"
              margin={{ top: 4, right: 18, bottom: 0, left: 0 }}
              barCategoryGap="34%"
            >
              <CartesianGrid
                vertical
                horizontal={false}
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                type="number"
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en", { notation: "compact" }).format(
                    value,
                  )
                }
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 10 }}
              />
              <YAxis
                type="category"
                dataKey="round"
                width={78}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#cbd5e1", fontSize: 11 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.035)" }}
                formatter={(value, name) => [formatAmount(value), name]}
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
                height={26}
                iconType="circle"
                iconSize={7}
                wrapperStyle={{ color: "#a1a1aa", fontSize: "10px" }}
              />
              <Bar
                dataKey="collected"
                name="Collected"
                fill="#34d399"
                radius={[0, 5, 5, 0]}
                maxBarSize={18}
              />
              <Bar
                dataKey="outstanding"
                name="Outstanding"
                fill="#fbbf24"
                radius={[0, 5, 5, 0]}
                maxBarSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/45">
            No student fee records available
          </div>
        )}
      </div>
      <p className="mt-2 text-[10px] text-white/35">
        {paymentData.length} fee {paymentData.length === 1 ? "round" : "rounds"}{" "}
        · {formatAmount(totalCollected + totalOutstanding)} billed
      </p>
    </section>
  );
};

export default PayementsChart;
