import React from "react";
import TeachersChart from "../Charts/TeachersChart";
import TeacherList from "../../Constants/Teachers.json";

const Teachers = () => {
  const activeTeacherCount = TeacherList.filter(
    (teacher) => teacher.state === "Active",
  ).length;
  const classCount = TeacherList.reduce(
    (total, teacher) => total + (teacher.classes?.length ?? 0),
    0,
  );

  return (
    <main className="w-full h-full min-w-0 overflow-y-auto bg-gray-900 p-4 text-white sm:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="flex min-w-0 flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Faculty overview
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Teachers
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                Manage faculty, teaching assignments, and current status.
              </p>
            </div>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-gray-800/70 p-4">
                <dt className="text-xs text-white/50">Total teachers</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">
                  {TeacherList.length}
                </dd>
              </div>
              <div className="rounded-lg border border-emerald-300/15 bg-emerald-950/25 p-4">
                <dt className="text-xs text-white/50">Active teachers</dt>
                <dd className="mt-2 text-2xl font-semibold text-emerald-200">
                  {activeTeacherCount}
                </dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-gray-800/70 p-4">
                <dt className="text-xs text-white/50">Teaching assignments</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">
                  {classCount}
                </dd>
              </div>
            </dl>
          </div>
          <div className="h-56 rounded-lg border border-white/10 bg-gray-800/70 p-4 xl:h-auto">
            <TeachersChart />
          </div>
        </section>

        <section className="min-w-0 border-t border-white/10 pt-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Faculty roster
              </h2>
              <p className="mt-1 text-sm text-white/45">
                {TeacherList.length} teacher records
              </p>
            </div>
          </div>
          <nav className="mb-2 hidden grid-cols-[1.2fr_0.9fr_1.2fr_0.6fr_0.7fr_0.7fr] items-center gap-4 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white/40 lg:grid">
            <span>Teacher</span>
            <span>Department</span>
            <span>Subject</span>
            <span>Classes</span>
            <span>Attendance</span>
            <span>Status</span>
          </nav>
          <div className="flex flex-col gap-2">
            {TeacherList.map((teacher) => (
              <article
                className="grid min-w-0 grid-cols-2 items-center gap-x-4 gap-y-4 rounded-lg border border-white/[0.07] bg-gray-800/50 p-4 transition-colors hover:border-emerald-300/20 hover:bg-gray-800 lg:grid-cols-[1.2fr_0.9fr_1.2fr_0.6fr_0.7fr_0.7fr] lg:gap-4"
                key={teacher.Id}
              >
                <div className="col-span-2 flex min-w-0 items-center gap-3 lg:col-span-1">
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-gray-700">
                    <img
                      src={teacher.profileImage}
                      className="h-full w-full object-cover"
                      alt={`${teacher.firstName} ${teacher.lastName}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-white">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <p className="mt-1 truncate font-mono text-xs text-white/40">
                      {teacher.Id}
                    </p>
                  </div>
                </div>
                <div className="min-w-0">
                  <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/40 lg:hidden">
                    Department
                  </span>
                  <p className="truncate text-sm text-white/75">
                    {teacher.department || "-"}
                  </p>
                </div>
                <div className="min-w-0">
                  <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/40 lg:hidden">
                    Subject
                  </span>
                  <p className="truncate text-sm text-white/75">
                    {teacher.subject || "-"}
                  </p>
                </div>
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/40 lg:hidden">
                    Classes
                  </span>
                  <p className="text-sm text-white/75">
                    {teacher.classes?.length ?? 0}
                  </p>
                </div>
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/40 lg:hidden">
                    Attendance
                  </span>
                  <p className="text-sm text-white/75">
                    {teacher.attendance || "-"}
                  </p>
                </div>
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/40 lg:hidden">
                    Status
                  </span>
                  <span
                    className={`${teacher.state === "Active" ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200" : "border-orange-300/20 bg-orange-300/10 text-orange-200"} inline-flex max-w-full items-center rounded-full border px-2.5 py-1 text-xs font-medium`}
                  >
                    {teacher.state || "Unknown"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Teachers;
