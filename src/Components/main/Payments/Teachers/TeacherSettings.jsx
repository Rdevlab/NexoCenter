import React from "react";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuCalendarDays,
  LuBriefcase,
  LuGraduationCap,
  LuClock,
  LuDollarSign,
  LuShieldCheck,
  LuActivity,
  LuAward,
  LuCheck,
} from "react-icons/lu";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const performanceData = [
  { month: "Jan", performance: 82 },
  { month: "Feb", performance: 87 },
  { month: "Mar", performance: 84 },
  { month: "Apr", performance: 91 },
  { month: "May", performance: 94 },
  { month: "Jun", performance: 96 },
];

const attendanceData = [
  { month: "Jan", attendance: 96 },
  { month: "Feb", attendance: 98 },
  { month: "Mar", attendance: 95 },
  { month: "Apr", attendance: 100 },
  { month: "May", attendance: 98 },
  { month: "Jun", attendance: 100 },
];

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border  border-white/10 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border  border-white/10 text-emerald-600 shadow-sm">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-700">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}

const TeacherSetting = (props) => {
  const person = props.logedInPerson;

  return (
    <div className="h-screen w-full overflow-scroll pb-20 bg-[var(--color)] p-3 sm:p-5">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        {/* Profile Header */}
        <section className="overflow-hidden rounded-3xl  shadow-md border border-white/8">
          <div className="h-28 bg-[url('https://img.magnific.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?semt=ais_hybrid&w=740&q=80')]  bg-center bg-cover sm:h-36" />

          <div className="-mt-14 px-4 pb-5 sm:-mt-16 sm:px-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={person.profileImage}
                  alt={`${person.firstName} ${person.lastName}`}
                  className="h-28 w-28 rounded-full border-2 border-white backdrop-blur-xl object-cover shadow-md sm:h-32 sm:w-32"
                />

                <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
              </div>

              {/* Name */}
              <div className="flex-1 text-center sm:pb-1 sm:text-left">
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
                    {person.firstName} {person.lastName}
                  </h1>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {person.state}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {person.Role} · {person.department}
                </p>

                <p className="mt-1 text-xs text-slate-400">ID: {person.Id}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="flex flex-wrap gap-3">
          <div className="min-w-[140px] flex-1 rounded-2xl border border-white/10 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
                <LuActivity size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Attendance</p>
                <p className="text-xl font-bold text-slate-800">
                  {person.attendance}
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-[140px] flex-1 rounded-2xl border  border-white/10 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
                <LuAward size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Performance</p>
                <p className="text-xl font-bold text-slate-800">
                  {person.performance}
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-[140px] flex-1 rounded-2xl border  border-white/10 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-2 text-purple-600">
                <LuGraduationCap size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Classes</p>
                <p className="text-xl font-bold text-slate-800">
                  {person.classes?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Information */}
        <section className="rounded-3xl border  border-white/10 p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <LuUser className="text-emerald-600" size={21} />
            <h2 className="text-lg font-bold text-slate-800">
              Personal Information
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <InfoItem
              icon={LuUser}
              label="Full Name"
              value={`${person.firstName} ${person.lastName}`}
            />

            <InfoItem icon={LuUser} label="Gender" value={person.gender} />

            <InfoItem
              icon={LuCalendarDays}
              label="Age"
              value={`${person.age} years`}
            />

            <InfoItem icon={LuMail} label="Email" value={person.email} />

            <InfoItem icon={LuPhone} label="Phone" value={person.phone} />

            <InfoItem
              icon={LuBriefcase}
              label="Department"
              value={person.department}
            />

            <InfoItem
              icon={LuGraduationCap}
              label="Subject"
              value={person.subject}
            />

            <InfoItem icon={LuShieldCheck} label="Role" value={person.Role} />
          </div>
        </section>

        {/* Performance Chart */}
        <section className="rounded-3xl border  border-white/10 p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-800">Performance Overview</h2>

              <p className="text-xs text-slate-400">Monthly performance</p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
              <LuAward size={20} />
            </div>
          </div>

          <div className="h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient
                    id="performanceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />

                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  domain={[70, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="performance"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#performanceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Attendance Chart */}
        <section className="rounded-3xl border  border-white/10 p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-800">Attendance Overview</h2>

              <p className="text-xs text-slate-400">Monthly attendance rate</p>
            </div>

            <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
              <LuCheck size={20} />
            </div>
          </div>

          <div className="h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient
                    id="attendanceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />

                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  domain={[90, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#attendanceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Employment & Salary */}
        <section className="rounded-3xl border  border-white/10 p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <LuBriefcase size={21} className="text-emerald-600" />

            <h2 className="text-lg font-bold text-slate-800">Employment</h2>
          </div>

          <div className="flex flex-col gap-3">
            <InfoItem
              icon={LuCalendarDays}
              label="Joining Date"
              value={person.joiningDate}
            />

            <InfoItem
              icon={LuBriefcase}
              label="Employment Type"
              value={person.employmentType}
            />

            <InfoItem
              icon={LuPhone}
              label="Emergency Contact"
              value={person.emergencyContact}
            />

            <InfoItem
              icon={LuDollarSign}
              label="Salary"
              value={
                person.salary?.[0]?.salary
                  ? `$${person.salary[0].salary}`
                  : "Not set"
              }
            />
          </div>
        </section>

        {/* Footer Status */}
        <div className="rounded-3xl bg-slate-800 p-5 text-center text-white shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <LuCheck size={18} className="text-emerald-400" />

            <span className="text-sm font-semibold">
              Account is {person.state}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Last profile status: Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherSetting;
