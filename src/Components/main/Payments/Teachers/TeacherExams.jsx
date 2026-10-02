import React, { useState } from "react";
import examList from "../../../../Constants/Exams.json";
import { LuCalendarDays, LuClipboardCheck, LuTimer } from "react-icons/lu";
const TeacherExams = (props) => {
  const teacher = props.logedInPerson?.Id;
  const [toggler, setToggler] = useState(false);
  const testKey = toggler ? "final_tests" : "middle_tests";
  const testLabel = toggler ? "Final tests" : "Middle tests";
  const exams = examList.flatMap((round) =>
    (round[testKey] || [])
      .filter((exam) => exam.teacher === teacher)
      .map((exam, index) => ({ ...exam, round: round.round, index })),
  );
  const upcomingCount = exams.filter(
    (exam) => exam.state?.toLowerCase() === "upcoming",
  ).length;

  return (
    <div className="flex h-full w-full min-w-0 flex-col overflow-hidden text-white xl:p-6">
      <header className="flex flex-col gap-5 border-b border-white/[0.06] bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/30 px-4 pb-5 pt-5 sm:px-6 sm:pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-300/20">
              <LuClipboardCheck size={22} />
            </span>
            <div>
              <h1 className="text-lg font-bold sm:text-xl">Exam schedule</h1>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                Keep track of your upcoming assessments
              </p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
            {upcomingCount} upcoming
          </span>
        </div>

        <div className="relative flex w-full max-w-sm items-center rounded-full border border-emerald-400/20 bg-slate-950/70 p-1 shadow-inner shadow-black/30 ring-1 ring-white/[0.03]">
          <button
            type="button"
            aria-pressed={!toggler}
            onClick={() => {
              setToggler(false);
            }}
            className={`relative z-10 min-h-11 flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
              !toggler ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Middle Test
          </button>
          <button
            type="button"
            aria-pressed={toggler}
            onClick={() => {
              setToggler(true);
            }}
            className={`relative z-10 min-h-11 flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
              toggler ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Final Test
          </button>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-full border border-emerald-300/20 bg-gradient-to-br from-emerald-500/90 to-green-700 shadow-md shadow-emerald-950/50 transition-transform duration-300 ease-out"
            style={{
              transform: toggler ? "translateX(100%)" : "translateX(0)",
            }}
          />
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-20 pt-5 sm:px-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-100">
              {testLabel}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {exams.length} {exams.length === 1 ? "assessment" : "assessments"}{" "}
              assigned to you
            </p>
          </div>
        </div>

        {exams.length ? (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 2xl:grid-cols-3">
            {exams.map((exam, index) => {
              const isUpcoming = exam.state?.toLowerCase() === "upcoming";
              const colors = [
                "border-cyan-400/20 from-cyan-400/[0.08]",
                "border-violet-400/20 from-violet-400/[0.08]",
                "border-amber-400/20 from-amber-400/[0.08]",
                "border-rose-400/20 from-rose-400/[0.08]",
              ];

              return (
                <article
                  key={`${exam.round}-${exam.level}-${exam.date}-${index}`}
                  className={`rounded-2xl border bg-gradient-to-br ${colors[index % colors.length]} to-slate-900/90 p-4 shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:p-5`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="inline-flex rounded-full border border-white/10 bg-slate-950/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                        Round {exam.round}
                      </span>
                      <h3 className="mt-3 truncate text-base font-semibold capitalize text-white">
                        {exam.level || "Exam"}
                      </h3>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${
                        isUpcoming
                          ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                          : "border-amber-300/20 bg-amber-300/10 text-amber-200"
                      }`}
                    >
                      <LuTimer size={13} />
                      {exam.state || "Scheduled"}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3 text-sm text-slate-300">
                    <LuCalendarDays
                      className="shrink-0 text-slate-400"
                      size={16}
                    />
                    <span>{exam.date || "Date not set"}</span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-400 ring-1 ring-white/10">
              <LuClipboardCheck size={25} />
            </span>
            <h3 className="mt-4 text-sm font-semibold text-slate-200">
              No {testLabel.toLowerCase()} scheduled
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Any {testLabel.toLowerCase()} assigned to you will show up here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherExams;
