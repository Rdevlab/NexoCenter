import React from "react";
import { LuLogOut } from "react-icons/lu";
import StudentsChart from "../Charts/StudentsChart";
import TeachersChart from "../Charts/TeachersChart";
import ClassesChart from "../Charts/ClassesChart";
import PayementsChart from "../Charts/PayementsChart";
import TestsChart from "../Charts/TestsChart";
import AttendanceChart from "../Charts/AttendanceChart";

const Dashboard = ({ logedInPerson = {} }) => {
  const fullName = [logedInPerson.firstName, logedInPerson.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="w-full h-full flex flex-col gap-6 p-6 duration-500">
      {/* logged in user information */}
      <nav className="w-full flex items-center justify-between p-2 px-6 rounded-md bg-gray-800 duration-500 text-white">
        <div className="flex items-center gap-4 text-green-500">
          <div className="w-12 h-12 rounded-full  border overflow-hidden p-1">
            {logedInPerson.profileImage &&
              logedInPerson.profileImage !== "-" && (
                <img src={logedInPerson.profileImage} alt={fullName} />
              )}
          </div>
          <h1 className="font-bold text-xl">{fullName || "User"}</h1>
        </div>
        <button>
          <LuLogOut />
        </button>
      </nav>
      {/* content section */}
      <div className="flex flex-col gap-12 w-full h-full text-white/60">
        {/* header */}
        <div className="flex items-center gap-4 h-50 justify-between">
          <StudentsChart />
          <TeachersChart />
          <ClassesChart />
          <TestsChart />
        </div>
        {/* middle */}
        <div className="flex items-center h-60 gap-4 justify-between">
          <PayementsChart w={"w-1/2"} />
          <AttendanceChart />
        </div>
        {/* bottom */}
        <div className="flex items-center gap-4 justify-between"></div>
      </div>
    </div>
  );
};

export default Dashboard;
