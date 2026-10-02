import React from "react";
import StudentList from "../../../../Constants/Studetns.json";
import { LuClock, LuGraduationCap, LuUsers } from "react-icons/lu";
const TeacherStudents = (props) => {
  const teacherId = props.logedInPerson?.Id;
  const students = StudentList.map((student, index) => ({
    ...student,
    listKey: `${student.Id || "student"}-${index}`,
    currentClass: student.ClassJourny?.at(-1),
  })).filter((student) => student.currentClass?.teacher === teacherId);

  return (
    <div className="flex h-full w-full min-w-0 flex-col gap-5 overflow-hidden p-4 text-white sm:p-6">
      <header className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 p-5 shadow-xl shadow-black/10 sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-300 ring-1 ring-indigo-300/20">
            <LuUsers size={23} />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-white sm:text-xl">
              My students
            </h1>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Students currently assigned to your classes
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-indigo-300/15 bg-indigo-300/10 px-3 py-1.5 text-xs font-semibold text-indigo-200">
          {students.length} {students.length === 1 ? "student" : "students"}
        </span>
      </header>

      <div className="min-h-0 w-full flex-1 overflow-y-auto pb-20">
        {students.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
            {students.map((st, i) => {
              const colors = [
                "border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.08] to-slate-900/80",
                "border-violet-400/20 bg-gradient-to-br from-violet-400/[0.08] to-slate-900/80",
                "border-rose-400/20 bg-gradient-to-br from-rose-400/[0.08] to-slate-900/80",
                "border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] to-slate-900/80",
              ];
              const fullName = [st.name, st.fathername, st.lastname]
                .filter(Boolean)
                .join(" ");
              const isActive = st.presence?.toLowerCase() === "active";

              return (
                <div
                  key={st.listKey}
                  className={`group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border p-4 text-sm shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:gap-4 sm:p-5 ${colors[i % colors.length]}`}
                >
                  <div className="relative h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 p-[2px] sm:h-16 sm:w-16">
                    <div className="h-full w-full overflow-hidden rounded-[calc(1rem-2px)] bg-slate-800">
                      {st.profileImage ? (
                        <img
                          src={st.profileImage}
                          alt={fullName || "Student"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-lg font-bold text-indigo-100">
                          {(st.name || "S").charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-2">
                      <h2
                        className="truncate font-semibold text-white"
                        title={fullName}
                      >
                        {fullName || "Student"}
                      </h2>
                    </div>
                    <div className="mt-2 flex min-w-0 items-center gap-1.5 text-xs text-slate-300">
                      <LuGraduationCap
                        className="shrink-0 text-indigo-300"
                        size={15}
                      />
                      <span
                        className="truncate"
                        title={st.currentClass?.ClassName || "Class not set"}
                      >
                        {st.currentClass?.ClassName || "Class not set"}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                          isActive
                            ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                            : "border-slate-300/15 bg-slate-300/10 text-slate-300"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-300" : "bg-slate-400"}`}
                        />
                        {st.presence || "Status unknown"}
                      </span>
                      <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-slate-400">
                        <LuClock className="shrink-0" size={14} />
                        <span className="truncate">
                          {st.currentClass?.time || "Time not set"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-400 ring-1 ring-white/10">
              <LuUsers size={25} />
            </span>
            <h2 className="mt-4 text-sm font-semibold text-slate-200">
              No students assigned yet
            </h2>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Students enrolled in your classes will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherStudents;
