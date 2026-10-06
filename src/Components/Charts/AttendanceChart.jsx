import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import TeacherList from "../../Constants/Teachers.json";

const attendanceData = TeacherList.map((teacher) => ({
  name: teacher.firstName || teacher.Id,
  attendance: Number.parseFloat(teacher.attendance),
})).filter((teacher) => Number.isFinite(teacher.attendance));

const averageAttendance = attendanceData.length
  ? Math.round(
      attendanceData.reduce((total, teacher) => total + teacher.attendance, 0) /
        attendanceData.length,
    )
  : 0;

const AttendanceChart = () => {
  return (
    <section className="flex h-full min-h-[18rem] w-full min-w-0 flex-col rounded-lg border border-white/10 bg-gray-800/70 p-4 text-white sm:p-5 xl:w-1/2">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white">
            Teacher attendance
          </h2>
          <p className="mt-1 text-xs text-white/45">
            Attendance rate by faculty member
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-semibold leading-none text-emerald-300">
            {averageAttendance}%
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-wide text-white/40">
            Average
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        {attendanceData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={attendanceData}
              layout="vertical"
              margin={{ top: 4, right: 30, bottom: 0, left: 4 }}
              barCategoryGap="24%"
            >
              <CartesianGrid
                horizontal={false}
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={74}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#cbd5e1", fontSize: 11 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.035)" }}
                formatter={(value) => [`${value}%`, "Attendance"]}
                contentStyle={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  backgroundColor: "#111827",
                  color: "#f8fafc",
                  fontSize: "12px",
                }}
                itemStyle={{ color: "#6ee7b7" }}
                labelStyle={{ color: "#cbd5e1", marginBottom: "4px" }}
              />
              <Bar
                dataKey="attendance"
                name="Attendance"
                fill="#34d399"
                radius={[0, 5, 5, 0]}
                maxBarSize={18}
              >
                <LabelList
                  dataKey="attendance"
                  position="right"
                  formatter={(value) => `${value}%`}
                  fill="#a7f3d0"
                  fontSize={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/45">
            No attendance records available
          </div>
        )}
      </div>
      <p className="mt-2 text-[10px] text-white/35">
        Based on {attendanceData.length} teacher attendance records
      </p>
    </section>
  );
};

export default AttendanceChart;
