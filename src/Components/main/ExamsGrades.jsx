import React, { useState } from "react";
import {
  LuBookOpen,
  LuCalendarDays,
  LuClock3,
  LuGraduationCap,
  LuSearch,
} from "react-icons/lu";
import ExamRounds from "../../Constants/Exams.json";

const examTypes = ["All exams", "Midterm", "Final"];

const formatExamDate = (value) => {
  const parts = value?.split("/").map((part) => Number(part.trim()));
  if (
    !parts ||
    parts.length !== 3 ||
    parts.some((part) => !Number.isFinite(part))
  ) {
    return value || "Date not set";
  }

  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const ExamsGrades = () => {
  const [activeType, setActiveType] = useState("All exams");
  const [activeRound, setActiveRound] = useState("All rounds");
  const [searchQuery, setSearchQuery] = useState("");

  const exams = ExamRounds.flatMap((roundData) => [
    ...(roundData.middle_tests ?? []).map((exam) => ({
      ...exam,
      round: roundData.round,
      type: "Midterm",
    })),
    ...(roundData.final_tests ?? []).map((exam) => ({
      ...exam,
      round: roundData.round,
      type: "Final",
    })),
  ]);
  const rounds = [...new Set(exams.map((exam) => exam.round).filter(Boolean))];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleExams = exams.filter((exam) => {
    const matchesType = activeType === "All exams" || exam.type === activeType;
    const matchesRound =
      activeRound === "All rounds" || exam.round === activeRound;
    const matchesQuery =
      !normalizedQuery ||
      [exam.level, exam.teacher, exam.round, exam.state, exam.type]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedQuery));
    return matchesType && matchesRound && matchesQuery;
  });
  const upcomingCount = exams.filter(
    (exam) => exam.state?.toLowerCase() === "upcoming",
  ).length;
  const midtermCount = exams.filter((exam) => exam.type === "Midterm").length;
  const finalCount = exams.filter((exam) => exam.type === "Final").length;

  return (
    <main className="h-full w-full min-w-0 overflow-y-auto bg-gray-900 p-4 text-white sm:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Academic calendar
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Exams &amp; Grades
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
              Review exam dates, assigned levels, and assessment status by
              round.
            </p>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-lg border border-emerald-300/15 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-100/80">
            <LuCalendarDays aria-hidden="true" className="text-emerald-300" />
            <span>
              {rounds.length} {rounds.length === 1 ? "round" : "rounds"}
            </span>
          </div>
        </header>

        <section
          aria-label="Exam summary"
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          <div className="rounded-lg border border-white/10 bg-gray-800/65 p-4">
            <div className="flex items-center justify-between gap-2 text-white/50">
              <span className="text-xs">Scheduled exams</span>
              <LuGraduationCap
                aria-hidden="true"
                className="text-emerald-300"
              />
            </div>
            <p className="mt-3 text-2xl font-semibold">{exams.length}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-gray-800/65 p-4">
            <div className="flex items-center justify-between gap-2 text-white/50">
              <span className="text-xs">Midterms</span>
              <LuBookOpen aria-hidden="true" className="text-sky-300" />
            </div>
            <p className="mt-3 text-2xl font-semibold">{midtermCount}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-gray-800/65 p-4">
            <div className="flex items-center justify-between gap-2 text-white/50">
              <span className="text-xs">Final exams</span>
              <LuGraduationCap aria-hidden="true" className="text-violet-300" />
            </div>
            <p className="mt-3 text-2xl font-semibold">{finalCount}</p>
          </div>
          <div className="rounded-lg border border-amber-300/15 bg-amber-950/20 p-4">
            <div className="flex items-center justify-between gap-2 text-amber-100/60">
              <span className="text-xs">Upcoming</span>
              <LuClock3 aria-hidden="true" className="text-amber-300" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-amber-100">
              {upcomingCount}
            </p>
          </div>
        </section>

        <section className="min-w-0">
          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Assessment schedule</h2>
              <p className="mt-1 text-sm text-white/45">
                {visibleExams.length} of {exams.length} exams
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex w-full items-center gap-1 rounded-lg border border-white/10 bg-gray-800/70 p-1 sm:w-auto">
                {examTypes.map((type) => (
                  <button
                    type="button"
                    key={type}
                    aria-pressed={activeType === type}
                    onClick={() => setActiveType(type)}
                    className={`min-h-9 flex-1 rounded-md px-3 text-xs font-medium transition-colors sm:flex-none ${activeType === type ? "bg-emerald-300 text-gray-950" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <label className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
                <LuSearch
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search level or teacher"
                  aria-label="Search exams by level or teacher"
                  className="h-10 w-full rounded-lg border border-white/10 bg-gray-800/70 pl-9 pr-3 text-sm text-white placeholder:text-white/35 focus:border-emerald-300/50"
                />
              </label>
            </div>
          </div>

          <div
            className="mb-4 flex flex-wrap gap-2"
            aria-label="Filter by round"
          >
            {["All rounds", ...rounds].map((round) => (
              <button
                type="button"
                key={round}
                aria-pressed={activeRound === round}
                onClick={() => setActiveRound(round)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${activeRound === round ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100" : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"}`}
              >
                {round}
              </button>
            ))}
          </div>

          {visibleExams.length > 0 ? (
            <div className="flex flex-col gap-3">
              {visibleExams.map((exam, index) => (
                <article
                  key={`${exam.round}-${exam.type}-${exam.level}-${index}`}
                  className="grid min-w-0 grid-cols-1 gap-4 rounded-lg border border-white/[0.08] bg-gray-800/45 p-4 transition-colors hover:border-emerald-300/20 hover:bg-gray-800/75 sm:grid-cols-[4.25rem_minmax(0,1fr)_auto] sm:items-center sm:p-5"
                >
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg border border-white/10 bg-gray-900/80 text-center">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                      {exam.date?.split("/")[1]?.trim() || "--"}
                    </span>
                    <span className="mt-0.5 text-xs font-medium text-white/75">
                      {exam.date?.split("/")[2]?.trim() || "--"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${exam.type === "Midterm" ? "bg-sky-300/10 text-sky-200" : "bg-violet-300/10 text-violet-200"}`}
                      >
                        {exam.type}
                      </span>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium text-white/55">
                        Round {exam.round}
                      </span>
                    </div>
                    <h3 className="mt-2 break-words text-base font-medium text-white">
                      {exam.level || "Level not assigned"}
                    </h3>
                    <p className="mt-1 text-xs text-white/45">
                      Teacher{" "}
                      <span className="font-mono text-white/65">
                        {exam.teacher || "Not assigned"}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                    <div className="flex items-center gap-2 text-xs text-white/55">
                      <LuCalendarDays
                        aria-hidden="true"
                        className="text-white/40"
                      />
                      {formatExamDate(exam.date)}
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${exam.state?.toLowerCase() === "upcoming" ? "bg-amber-300/10 text-amber-200" : exam.state?.toLowerCase() === "completed" ? "bg-emerald-300/10 text-emerald-200" : "bg-white/10 text-white/60"}`}
                    >
                      {exam.state || "Unscheduled"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-white/15 px-5 py-12 text-center">
              <LuCalendarDays
                aria-hidden="true"
                className="mx-auto text-2xl text-white/30"
              />
              <h3 className="mt-3 text-sm font-medium text-white/80">
                No exams found
              </h3>
              <p className="mt-1 text-xs text-white/45">
                Try a different exam type, round, or search term.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ExamsGrades;
