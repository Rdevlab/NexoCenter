import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/SideBar/Sidebar";
import Dashboard from "./Components/main/Dashboard";
import Students from "./Components/main/Students";
import Teachers from "./Components/main/Teachers";
import Classes from "./Components/main/Classes";
import Attendance from "./Components/main/Attendance";
import ExamsGrades from "./Components/main/ExamsGrades";
import Payments from "./Components/main/Payments";
import Communication from "./Components/main/Communication";
import Schdule from "./Components/main/Schdule";
import Reports from "./Components/main/Reports";
import Setting from "./Components/main/Setting";
import Users from "./Components/main/Users";
import LoginForm from "./Components/main/LoginForm";
import TeacherDashboard from "./Components/main/Payments/Teachers/TeacherDashboard";
import TeacherSidebar from "./Components/SideBar/TeacherSidebar";
import TeacherStudents from "./Components/main/Payments/Teachers/TeacherStudents";
import TeacherClasses from "./Components/main/Payments/Teachers/TeacherClasses";
import TeacherAttendance from "./Components/main/Payments/Teachers/TeacherAttendance";
import TeacherExams from "./Components/main/Payments/Teachers/TeacherExams";
import TeacherReport from "./Components/main/Payments/Teachers/TeacherReport";

const DashboardLayout = (props) => {
  return (
    <div className="w-screen h-screen bg-gray-900 flex">
      <Sidebar />
      <Routes>
        <Route
          index
          element={<Dashboard logedInPerson={props.logedInPerson} />}
        />
        <Route
          path="Dashboard"
          element={<Dashboard logedInPerson={props.logedInPerson} />}
        />
        <Route path="Students" element={<Students />} />
        <Route path="Teachers" element={<Teachers />} />
        <Route path="Classes & Courses" element={<Classes />} />
        <Route path="Attendance" element={<Attendance />} />
        <Route path="Exams & Grades" element={<ExamsGrades />} />
        <Route path="Payments & Fees" element={<Payments />} />
        <Route path="Communication" element={<Communication />} />
        <Route path="Schedule" element={<Schdule />} />
        <Route path="Reports" element={<Reports />} />
        <Route path="Settings" element={<Setting />} />
        <Route path="Admin & Users" element={<Users />} />
      </Routes>
    </div>
  );
};
const TeacherDashboardLayout = (props) => {
  return (
    <div className="w-screen h-screen flex gap-2 bg-[var(--color)]">
      <TeacherSidebar />
      <Routes>
        <Route
          index
          element={<TeacherDashboard logedInPerson={props.logedInPerson} />}
        />
        <Route
          path="Dashboard"
          element={<TeacherDashboard logedInPerson={props.logedInPerson} />}
        />
        <Route
          path="Students"
          element={<TeacherStudents logedInPerson={props.logedInPerson} />}
        />
        <Route
          path="Classes"
          element={<TeacherClasses logedInPerson={props.logedInPerson} />}
        />
        <Route
          path="Attendance"
          element={<TeacherAttendance logedInPerson={props.logedInPerson} />}
        />
        <Route
          path="Exams"
          element={<TeacherExams logedInPerson={props.logedInPerson} />}
        />
        <Route
          path="Reports"
          element={<TeacherReport logedInPerson={props.logedInPerson} />}
        />
      </Routes>
    </div>
  );
};

const App = () => {
  const [logedInPerson, setLogedInPerson] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("logedInPerson") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (Object.keys(logedInPerson).length > 0) {
      localStorage.setItem("logedInPerson", JSON.stringify(logedInPerson));
    } else {
      localStorage.removeItem("logedInPerson");
    }
  }, [logedInPerson]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loginForm" element={<Navigate to="/" replace />} />
        <Route
          path="/"
          element={<LoginForm setLogedInPerson={setLogedInPerson} />}
        />
        <Route
          path="/Admin/*"
          element={<DashboardLayout logedInPerson={logedInPerson} />}
        />
        <Route
          path="/Teacher/*"
          element={<TeacherDashboardLayout logedInPerson={logedInPerson} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
