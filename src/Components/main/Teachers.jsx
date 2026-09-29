import React from "react";
import TeachersChart from "../Charts/TeachersChart";
import TeacherList from "../../Constants/Teachers.json";
import { MdFemale, MdMale } from "react-icons/md";
const Teachers = () => {
  return (
    <div className="w-full flex flex-col gap-4 h-full  text-white font-2xl p-6 overflow-y-scroll">
      <div className="w-full flex h-70 shrink-0 items-center justify-between p-4 rounded-md">
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Welcome to Teachers Section</h1>
          <p>
            In this part all informations are shared from the current teacher in
            Center
          </p>
        </div>
        <TeachersChart />
      </div>
      {/* teacher list */}
      <div className="flex flex-col gap-4 p-4 border-t border-white/20">
        <nav className="w-full grid grid-cols-7 items-center text-white/50 p-2 mb-4">
          <span>ID</span>
          <span>Image</span>
          <span>Name</span>
          <span>Lastname</span>
          <span>Gendar</span>
          <span>Age</span>
          <span>State</span>
        </nav>
        {TeacherList.map((teacher, i) => {
          return (
            <div className="w-full grid grid-cols-7 items-center text-white/50 mb-4 p-2 text-sm">
              <span>{teacher.Id}</span>
              <span className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={teacher.profileImage}
                  className="w-full h-full"
                  alt=""
                />
              </span>
              <span>{teacher.firstName}</span>
              <span>{teacher.lastName}</span>
              <span className="flex items-center gap-2">
                {teacher.gender == "Male" ? (
                  <MdMale className="text-green-700" />
                ) : (
                  <MdFemale className="text-pink-500" />
                )}
                {teacher.gender}
              </span>
              <span>{teacher.age}</span>
              <span
                className={`${teacher.state == "Active" ? "bg-green-200 text-green-800" : "bg-orange-200 text-orange-900"} w-max px-4 rounded-full text-sm`}
              >
                {teacher.state}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Teachers;
