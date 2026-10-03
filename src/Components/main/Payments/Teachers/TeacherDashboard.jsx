import { Link } from "react-router-dom";
import StudentList from "../../../../Constants/Studetns.json";
import StudentsChart from "../../../Charts/StudentsChart";
import {
  LuBell,
  LuBookOpen,
  LuChevronLeft,
  LuGraduationCap,
  LuSettings,
  LuUsers,
} from "react-icons/lu";
const TeacherDashboard = ({ logedInPerson = {} }) => {
  const fullName = [logedInPerson.firstName, logedInPerson.lastName]
    .filter(Boolean)
    .join(" ");
  const profileImage = logedInPerson.profileImage;
  const teacherId = logedInPerson.Id;

  // total students and total classes
  const totalStudents = new Set(
    StudentList.filter((student) =>
      student.ClassJourny?.some(
        (classJourney) => classJourney.teacher === teacherId,
      ),
    )
      .map((student) => student.Id)
      .filter(Boolean),
  ).size;
  const totalClasses = Array.isArray(logedInPerson.classes)
    ? logedInPerson.classes.length
    : 0;

  return (
    <div className="flex min-h-full w-full min-w-0 flex-col gap-5 bg-[var(--color)] p-4 pb-24 text-white sm:p-6 xl:h-full xl:overflow-y-auto xl:p-8">
      <header className="w-full">
        <div className="relative flex min-h-60 w-full items-center overflow-hidden rounded-3xl border border-white/10 bg-slate-900 bg-[url('https://img.magnific.com/free-vector/technology-banner-background-with-hexagonal-shapes-text-space_1017-22589.jpg?semt=ais_hybrid&w=740&q=80')] bg-cover bg-center p-4 pt-16 shadow-xl shadow-black/20 sm:p-6 sm:pt-16">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/20" />
          <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between sm:left-6 sm:right-6">
            <Link
              to={"/loginForm"}
              aria-label="Back to login"
              title="Back to login"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/40 text-white shadow-lg backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <LuChevronLeft size={20} />
            </Link>
            <div className="flex gap-2">
              <Link
                to={"Notifications"}
                aria-label="Notifications"
                title="Notifications"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/40 text-white shadow-lg backdrop-blur-md transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <LuBell size={18} />
              </Link>
              <Link
                to={"Settings"}
                aria-label="Settings"
                title="Settings"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/40 text-white shadow-lg backdrop-blur-md transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <LuSettings size={18} />
              </Link>
            </div>
          </div>
          <div className="relative z-10 flex w-full min-w-0 items-center gap-4 sm:gap-6">
            <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 rounded-full bg-gradient-to-br from-cyan-300 via-emerald-400 to-blue-500 p-[3px] shadow-lg shadow-cyan-950/40 sm:h-32 sm:w-32">
              <div className="h-full w-full overflow-hidden rounded-full border-4 border-slate-950/80 bg-slate-800 ring-1 ring-white/20">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={fullName || "Teacher profile"}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-3xl font-bold text-cyan-100 sm:text-4xl">
                    {(fullName || "T").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <span
                aria-label="Profile active"
                title="Profile active"
                className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-slate-950 bg-emerald-400 shadow-sm shadow-emerald-950 sm:bottom-1.5 sm:right-1.5 sm:h-5 sm:w-5"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80 sm:text-xs">
                Teacher profile
              </p>
              <h1 className="mt-1 truncate text-xl font-bold tracking-tight text-white sm:text-3xl">
                {fullName || "Teacher"}
              </h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="max-w-full truncate rounded-full border border-white/15 bg-slate-950/35 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-sm">
                  {logedInPerson.department || "Department not set"}
                </span>
                {logedInPerson.Id && (
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
                    ID {logedInPerson.Id}
                  </span>
                )}
              </div>
              <p
                className="mt-3 truncate text-xs text-slate-300 sm:text-sm"
                title={logedInPerson.email || ""}
              >
                {logedInPerson.email || "Email not provided"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section aria-label="Teacher overview">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
              Dashboard
            </p>
            <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
              Your teaching overview
            </h2>
          </div>
          <p className="text-xs text-slate-500 sm:text-sm">
            A quick look at your classes and students
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <article className="relative overflow-hidden rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-cyan-400/[0.12] via-slate-900/90 to-slate-950 p-5 shadow-lg shadow-black/10 sm:p-6">
            <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-cyan-300/[0.07] blur-2xl" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Total students
                </p>
                <p className="mt-3 text-4xl font-bold tracking-tight text-white">
                  {totalStudents}
                </p>
                <p className="mt-2 text-xs text-cyan-200/70">
                  Students in your classes
                </p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/15">
                <LuUsers size={23} />
              </span>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-2xl border border-violet-300/15 bg-gradient-to-br from-violet-400/[0.12] via-slate-900/90 to-slate-950 p-5 shadow-lg shadow-black/10 sm:p-6">
            <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-violet-300/[0.07] blur-2xl" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Total classes
                </p>
                <p className="mt-3 text-4xl font-bold tracking-tight text-white">
                  {totalClasses}
                </p>
                <p className="mt-2 text-xs text-violet-200/70">
                  Classes assigned to you
                </p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-300/10 text-violet-200 ring-1 ring-violet-300/15">
                <LuBookOpen size={23} />
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className="min-h-80 rounded-3xl border border-white/10 bg-slate-950/45 p-4 shadow-xl shadow-black/10 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-200 ring-1 ring-emerald-300/15">
            <LuGraduationCap size={20} />
          </span>
          <div>
            <h2 className="text-base font-semibold text-white">
              Student activity
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              At-a-glance student overview
            </p>
          </div>
        </div>
        <div className="h-64 w-full sm:h-72">
          <StudentsChart />
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
