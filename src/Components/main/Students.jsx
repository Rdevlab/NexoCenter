import React, { useState } from "react";
import StudentChart from "./../Charts/StudentsChart";
import StudentList from "../../Constants/Studetns.json";
import { LuChevronLeft, LuMail, LuPhoneCall } from "react-icons/lu";

const Students = () => {
  const [RightSidebar, setRightSidebar] = useState(false);
  const [fullDetailShow, setFullDetailShow] = useState(StudentList[0]);
  const [feeStateFilter, setFeeStateFilter] = useState("");
  const [roundFilter, setRoundFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");

  const currentJourney = (student) => student.ClassJourny.at(-1);
  const filterOptions = (field) =>
    [
      ...new Set(
        StudentList.map((student) => currentJourney(student)?.[field]).filter(
          Boolean,
        ),
      ),
    ].sort();
  const filteredStudents = StudentList.filter((student) => {
    const journey = currentJourney(student);
    return (
      (!feeStateFilter || journey?.feeState === feeStateFilter) &&
      (!roundFilter || journey?.round === roundFilter) &&
      (!teacherFilter || journey?.teacher === teacherFilter)
    );
  });

  return (
    <div className="w-full h-full flex overflow-hidden">
      <div className="w-full h-full min-w-0 flex flex-col gap-4 p-3 sm:p-4 overflow-y-scroll overflow-x-hidden">
        <div className="w-full h-[35vh] min-h-[220px] sm:h-[42vh] lg:h-[50vh] shrink-0 text-emerald-400">
          <StudentChart />
        </div>
        <div className="w-full min-w-0 flex flex-col gap-4 border-t border-emerald-400/20 pt-3 px-1 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-xs text-white/60">
              Fee State
              <select
                value={feeStateFilter}
                onChange={(event) => setFeeStateFilter(event.target.value)}
                className="w-full lg:w-auto min-w-36 rounded-md border border-emerald-300/20 bg-slate-900 px-3 py-2 text-sm text-white focus:border-emerald-300"
              >
                <option value="">All fee states</option>
                {filterOptions("feeState").map((feeState) => (
                  <option key={feeState} value={feeState}>
                    {feeState}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs text-white/60">
              Round
              <select
                value={roundFilter}
                onChange={(event) => setRoundFilter(event.target.value)}
                className="w-full lg:w-auto min-w-36 rounded-md border border-emerald-300/20 bg-slate-900 px-3 py-2 text-sm text-white focus:border-emerald-300"
              >
                <option value="">All rounds</option>
                {filterOptions("round").map((round) => (
                  <option key={round} value={round}>
                    {round}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs text-white/60">
              Teacher
              <select
                value={teacherFilter}
                onChange={(event) => setTeacherFilter(event.target.value)}
                className="w-full lg:w-auto min-w-36 rounded-md border border-emerald-300/20 bg-slate-900 px-3 py-2 text-sm text-white focus:border-emerald-300"
              >
                <option value="">All teachers</option>
                {filterOptions("teacher").map((teacher) => (
                  <option key={teacher} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </label>
            <span className="pb-2 text-xs text-white/50">
              {filteredStudents.length} of {StudentList.length} students
            </span>
          </div>
          <nav className="hidden w-full grid-cols-6 items-center text-emerald-100/60 mb-1 lg:grid">
            <h1>Profiles</h1>
            <h1>Name</h1>
            <h1>ID</h1>
            <h1>Current Level</h1>
            <h1>Email</h1>
            <h1>Fee State</h1>
          </nav>
          {filteredStudents.map((student) => (
            <button
              type="button"
              className="w-full grid grid-cols-2 lg:grid-cols-6 items-center gap-x-3 gap-y-2 p-3 lg:p-2 border border-emerald-300/10 bg-emerald-950/20 hover:bg-emerald-900/30 rounded-md text-left text-white/80 text-sm cursor-pointer transition-colors"
              key={student.Id}
              onClick={() => {
                setFullDetailShow(student);
                setRightSidebar(true);
              }}
            >
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
                <img
                  src={student.profileImage}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="min-w-0 truncate font-medium lg:font-normal">
                {student.name}
              </h2>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase text-white/40 lg:hidden">
                  ID
                </span>
                <p className="truncate">{student.Id}</p>
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase text-white/40 lg:hidden">
                  Current Level
                </span>
                <p className="truncate">{currentJourney(student)?.ClassName}</p>
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase text-white/40 lg:hidden">
                  Email
                </span>
                <p className="truncate">{student.email}</p>
              </div>
              <span
                className={`${currentJourney(student)?.feeState === "paid" ? "bg-emerald-300 text-emerald-950" : "bg-orange-300 text-orange-900"} w-max max-w-full px-3 py-0.5 rounded-full`}
              >
                <span className="mr-2 text-[10px] uppercase lg:hidden">
                  Fee
                </span>
                {currentJourney(student)?.feeState}
              </span>
            </button>
          ))}
          {filteredStudents.length === 0 && (
            <p className="py-8 text-center text-sm text-white/50">
              No students match these filters.
            </p>
          )}
        </div>
      </div>
      {RightSidebar && (
        <button
          type="button"
          aria-label="Close student details"
          onClick={() => setRightSidebar(false)}
          className="fixed inset-0 z-30 bg-black/45 backdrop-blur-[1px]"
        />
      )}
      <aside
        className={`fixed z-40 ${RightSidebar ? "translate-x-0" : "translate-x-full"} w-full sm:w-[42rem] max-w-full text-sm text-white/70 duration-500 top-0 right-0 bottom-0 overflow-y-auto border-l border-white/10 bg-gray-950/95 shadow-2xl backdrop-blur-xl p-3 sm:p-5`}
      >
        <div className="w-full min-h-full flex flex-col gap-5 items-center relative">
          <header className="w-full flex items-center justify-between gap-4 border-b border-white/10 pb-4 pl-10 pr-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300/80">
                Student record
              </p>
              <p className="mt-1 text-xs text-white/45">
                Profile and learning history
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-200">
              {fullDetailShow.presence || "Unknown"}
            </span>
          </header>
          <section className="w-full grid grid-cols-1 sm:grid-cols-[auto_1fr] items-center sm:items-start gap-5 rounded-xl border border-emerald-300/15 bg-gradient-to-br from-emerald-950/45 to-white/[0.03] p-4 sm:p-5">
            <div className="rounded-xl border border-white/10 bg-gray-900 w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden shadow-lg">
              <img
                src={fullDetailShow.profileImage}
                alt={fullDetailShow.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 w-full flex flex-col gap-4">
              <div className="min-w-0">
                <h1 className="truncate text-xl font-semibold text-white sm:text-2xl">
                  {fullDetailShow.name}
                </h1>
                <p className="mt-1 font-mono text-xs text-emerald-200/70">
                  {fullDetailShow.Id}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/10 pt-3">
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-wide text-white/40">
                    Father
                  </dt>
                  <dd className="mt-1 truncate text-sm text-white/80">
                    {fullDetailShow.fathername || "-"}
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-wide text-white/40">
                    Last name
                  </dt>
                  <dd className="mt-1 truncate text-sm text-white/80">
                    {fullDetailShow.lastname || "-"}
                  </dd>
                </div>
                <div className="col-span-2 min-w-0">
                  <dt className="text-[10px] uppercase tracking-wide text-white/40">
                    Joined
                  </dt>
                  <dd className="mt-1 truncate text-sm text-white/80">
                    {fullDetailShow.joinDate || "-"}
                  </dd>
                </div>
              </dl>
              <div className="flex flex-wrap gap-2">
                {fullDetailShow.phone && fullDetailShow.phone !== "-" && (
                  <a
                    href={`tel:${fullDetailShow.phone}`}
                    className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition-colors hover:border-emerald-300/30 hover:bg-emerald-300/10"
                  >
                    <LuPhoneCall aria-hidden="true" />
                    Call
                  </a>
                )}
                {fullDetailShow.email && fullDetailShow.email !== "-" && (
                  <a
                    href={`mailto:${fullDetailShow.email}`}
                    className="inline-flex min-w-0 max-w-full items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition-colors hover:border-emerald-300/30 hover:bg-emerald-300/10"
                  >
                    <LuMail aria-hidden="true" />
                    <span className="truncate">{fullDetailShow.email}</span>
                  </a>
                )}
                {(!fullDetailShow.phone || fullDetailShow.phone === "-") &&
                  (!fullDetailShow.email || fullDetailShow.email === "-") && (
                    <p className="text-xs text-white/40">
                      No contact details available
                    </p>
                  )}
              </div>
            </div>
          </section>
          <section className="w-full min-w-0">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Learning history
                </h2>
                <p className="mt-1 text-xs text-white/45">
                  Class progress and fee records
                </p>
              </div>
              <span className="shrink-0 rounded-md bg-white/5 px-2.5 py-1 text-xs text-white/60">
                {fullDetailShow.ClassJourny.length} records
              </span>
            </div>
            <div className="w-full overflow-x-auto">
              <div className="min-w-[680px] flex flex-col gap-2">
                <div className="grid grid-cols-9 items-center p-2 w-full px-4 text-[10px] font-semibold uppercase tracking-wide text-white/40">
                  <small>No</small>
                  <small>Level</small>
                  <small>M/t</small>
                  <small>F/T</small>
                  <small>Round</small>
                  <small>Fee</small>
                  <small>Bill No</small>
                  <small>F/State</small>
                  <small>Teacher</small>
                </div>
                {fullDetailShow.ClassJourny.map((item, index) => {
                  const isCurrent =
                    fullDetailShow.ClassJourny.length - 1 === index;
                  return (
                    <div
                      className={`grid grid-cols-9 relative p-2 items-center text-xs border rounded-md px-4 ${isCurrent ? "bg-emerald-400/10 border-emerald-300/30 text-white" : "bg-white/[0.025] border-white/[0.06] text-white/55"}`}
                      key={`${item.ClassName}-${index}`}
                    >
                      <small>{index + 1}</small>
                      <small>{item.ClassName}</small>
                      <small>{item.middleTestScore}</small>
                      <small>{item.finalTestScore}</small>
                      <small>{item.round}</small>
                      <small>{item.fee}</small>
                      <small>{item.billNumber}</small>
                      <small
                        className={`${item.feeState === "paid" ? "bg-emerald-300 text-emerald-950" : "bg-red-300 text-red-800"} w-max px-3 rounded-md`}
                      >
                        {item.feeState}
                      </small>
                      <small>{item.teacher}</small>
                      {isCurrent && (
                        <span className="absolute left-1 h-2 w-2 rounded-full bg-emerald-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </aside>
      <button
        type="button"
        aria-label={
          RightSidebar ? "Close student details" : "Open student details"
        }
        aria-expanded={RightSidebar}
        onClick={() => setRightSidebar((isOpen) => !isOpen)}
        className={`fixed z-50 top-4 ${RightSidebar ? "right-0 lg:right-[42rem]" : "right-0"} flex h-11 w-11 items-center justify-center rounded-l-md border border-emerald-300/30 bg-emerald-800 text-emerald-50 shadow-lg transition-[right,background-color] duration-500 hover:bg-emerald-700`}
      >
        <LuChevronLeft
          aria-hidden="true"
          className={`${RightSidebar ? "rotate-180" : "rotate-0"} duration-500`}
        />
      </button>
    </div>
  );
};

export default Students;
