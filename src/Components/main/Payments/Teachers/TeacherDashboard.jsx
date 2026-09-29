import StudentList from "../../../../Constants/Studetns.json";
import StudentsChart from "../../../Charts/StudentsChart";
import TeacherIncome from "./TeacherIncome";
const TeacherDashboard = ({ logedInPerson = {} }) => {
  const fullName = [logedInPerson.firstName, logedInPerson.lastName]
    .filter(Boolean)
    .join(" ");
  const profileImage =
    logedInPerson.profileImage && logedInPerson.profileImage !== "-"
      ? logedInPerson.profileImage
      : null;

  return (
    <div className="flex min-w-0 flex-col w-full gap-4 h-full min-h-screen overflow-y-scroll bg-[var(--color)] p-6 pl-14 xl:pl-6  text-white">
      <header className="flex flex-col xl:flex-row items-center gap-4 rounded-xl justify-between backdrop-blur-xl bg-white/3 xl:p-5 p-2">
        <div className="flex h-16 w-16 text-center items-center justify-center overflow-hidden rounded-full shrink-0 border border-white/20 bg-gray-700">
          {profileImage ? (
            <img
              src={profileImage}
              alt={fullName || "Teacher profile"}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xl font-semibold text-center">
              {fullName ? fullName.charAt(0) : "?"}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center">
            {fullName || "Teacher"}
          </h1>
          <p className="text-white/60">{logedInPerson.subject || "Teacher"}</p>
        </div>
        <div className="rounded-xl xl:p-5 p-2 text-center">
          <p className="text-sm text-white/60">Teacher ID</p>
          <p className="mt-2 text-lg font-semibold">
            {logedInPerson.Id || "—"}
          </p>
        </div>
        <div className="rounded-xl xl:p-5 p-2 text-center">
          <p className="text-sm text-white/60">Department</p>
          <p className="mt-2 text-lg font-semibold">
            {logedInPerson.department || "—"}
          </p>
        </div>
        <div className="rounded-xl xl:p-5 p-2 text-center">
          <p className="text-sm text-white/60">Email</p>
          <p className="mt-2 break-all text-lg font-semibold">
            {logedInPerson.email || "—"}
          </p>
        </div>
        <div className="rounded-xl xl:p-5 p-2 text-center">
          <p className="text-sm text-white/60">Password</p>
          <p className="mt-2 break-all text-lg font-semibold">
            {logedInPerson.password || "-"}
          </p>
        </div>
      </header>
      <div className="w-full h-50 shrink-0">
        <StudentsChart />
      </div>

      <section className="flex  gap-4 w-full">
        <div className="rounded-xl backdrop-blur-xl bg-white/3 p-5 sm:col-span-2 w-full xl:col-span-3">
          <p className="text-sm text-white/60">Classes</p>
          <p className="mt-2 text-lg font-semibold">
            {Array.isArray(logedInPerson.classes)
              ? logedInPerson.classes.join(", ")
              : logedInPerson.classes || "—"}
          </p>
        </div>
        <div className="rounded-xl backdrop-blur-xl bg-white/3 p-5 sm:col-span-2 w-full xl:col-span-3">
          <p className="text-sm text-white/60">Classes</p>
          <p className="mt-2 text-lg font-semibold">
            {Array.isArray(logedInPerson.classes)
              ? logedInPerson.classes.join(", ")
              : logedInPerson.classes || "—"}
          </p>
        </div>
        {/* income section */}
      </section>
    </div>
  );
};

export default TeacherDashboard;
