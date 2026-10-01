import { Link } from "react-router-dom";
import StudentList from "../../../../Constants/Studetns.json";
import StudentsChart from "../../../Charts/StudentsChart";
import TeacherIncome from "./TeacherIncome";
import { LuChevronLeft, LuSettings } from "react-icons/lu";
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
    <div className="flex min-w-0 flex-col w-full gap-4 h-full h-screen overflow-y-scroll bg-[var(--color)]  xl:p-6  text-white">
      <header className="flex flex-col xl:flex-row items-center gap-4 rounded-xl justify-between backdrop-blur-xl bg-white/3 xl:p-5">
        <div className="w-full h-60 pt-10 gap-2 rounded-b-4xl relative overflow-hidden p-2 flex items-center bg-[url('https://img.magnific.com/free-vector/technology-banner-background-with-hexagonal-shapes-text-space_1017-22589.jpg?semt=ais_hybrid&w=740&q=80')] bg-cover bg-center">
          <div className="absolute top-4 px-4 flex w-full justify-between">
            <Link
              to={"/loginForm"}
              className="p-2 flex items-center shadow-md bg-white/1 rounded-full"
            >
              <LuChevronLeft />
            </Link>
            <Link
              to={"Settings"}
              className="p-2 flex items-center shadow-md bg-white/1 rounded-full"
            >
              <LuSettings />
            </Link>
          </div>
          <img
            src={profileImage}
            alt={fullName}
            className="h-full w-36 shrink-0"
          />
          <div className="w-full h-full p-4">
            <h1 className="text-xl font-bold">{fullName || "Teacher"}</h1>
            <p className="">Department : {logedInPerson.department || "—"}</p>
            <p className="">ID : {logedInPerson.Id || "—"}</p>
            <div className="">
              <p className="text-sm text-white/60">Email</p>
              <p className="break-all">{logedInPerson.email || "—"}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="w-full h-70 shrink-0 p-4">
        <StudentsChart />
      </div>

      <section className="flex mb-24 p-2 gap-4 justify-center flex-wrap w-full">
        <div className="max-w-40 w-full h-40 flex flex-col items-center gap-4 justify-center p-2 rounded-xl bg-white/4 text-gray-400 ">
          <h1 className="font-semibold text-xl">Total Students</h1>
          <p className="text-5xl font-bold">{totalStudents}</p>
        </div>
        <div className="max-w-40 w-full h-40 flex flex-col items-center gap-4 justify-center p-2 rounded-xl bg-white/4 text-gray-400 ">
          <h1 className="font-semibold text-xl">Total Classes</h1>
          <p className="text-5xl font-bold">{totalClasses}</p>
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
