import React from "react";
import { LuClock, LuGraduationCap } from "react-icons/lu";

const TeacherClasses = (props) => {
  const person = props.logedInPerson;
  const classColors = [
    {
      border: "border-cyan-400/20",
      icon: "bg-cyan-400/10 text-cyan-300 ring-cyan-300/20",
      accent: "from-cyan-400/15",
    },
    {
      border: "border-violet-400/20",
      icon: "bg-violet-400/10 text-violet-300 ring-violet-300/20",
      accent: "from-violet-400/15",
    },
    {
      border: "border-amber-400/20",
      icon: "bg-amber-400/10 text-amber-300 ring-amber-300/20",
      accent: "from-amber-400/15",
    },
    {
      border: "border-rose-400/20",
      icon: "bg-rose-400/10 text-rose-300 ring-rose-300/20",
      accent: "from-rose-400/15",
    },
  ];

  return (
    <section className="w-full rounded-3xl border border-white/10 bg-slate-950/40 p-4 shadow-xl shadow-black/10 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-300/20">
            <LuGraduationCap size={22} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-white">Assigned classes</h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Your current teaching schedule
            </p>
          </div>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
          {person?.classes?.length || 0} total
        </span>
      </div>

      {person?.classes?.length ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
          {person.classes.map((item, index) => {
            const colors = classColors[index % classColors.length];
            const inProgress = item.classState?.toLowerCase() === "inprogress";

            return (
              <div
                key={`${item.levelName}-${item.round}-${index}`}
                className={`group relative overflow-hidden rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.accent} to-slate-900/90 p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 sm:p-5`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${colors.icon}`}
                  >
                    <LuGraduationCap size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold capitalize text-white">
                          {item.levelName || "Class"}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          Round {item.round || "—"}
                        </p>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          inProgress
                            ? "border border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                            : "border border-slate-400/15 bg-slate-400/10 text-slate-300"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${inProgress ? "bg-emerald-300" : "bg-slate-400"}`}
                        />
                        {item.classState || "Scheduled"}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3 text-sm text-slate-300">
                      <LuClock size={16} className="shrink-0 text-slate-400" />
                      <span className="truncate">
                        {item.time || "Time not set"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
            <LuGraduationCap size={23} />
          </span>
          <h3 className="mt-3 text-sm font-semibold text-slate-200">
            No classes assigned yet
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Your classes will appear here once they’re assigned.
          </p>
        </div>
      )}
    </section>
  );
};

export default TeacherClasses;
