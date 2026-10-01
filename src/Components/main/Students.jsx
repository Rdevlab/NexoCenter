import React, { useState } from "react";
import StudentChart from "./../Charts/StudentsChart";
import StudentList from "../../Constants/Studetns.json";
import { LuChevronLeft, LuMail, LuPhoneCall } from "react-icons/lu";

const Students = () => {
  const [RightSidebar, setRightSidebar] = useState(false);
  const [fullDetailShow, setFullDetailShow] = useState(StudentList[0]);

  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* centeral containers */}
      <div className="w-full h-full flex flex-col gap-4 p-4 overflow-y-scroll overflow-x-hidden">
        <div className="w-full h-[50vh] shrink-0 text-green-500">
          <StudentChart />
        </div>
        {/* student list */}
        <div className="w-full h-full flex flex-col gap-4 border-t border-white/20 pt-3 px-4">
          {/* heading */}
          <nav className="w-full grid grid-cols-6 items-center text-white/50 mb-4">
            <h1>Profiles</h1>
            <h1>Name</h1>
            <h1>ID</h1>
            <h1>Current Level</h1>
            <h1>Email</h1>
            <h1>Fee State</h1>
          </nav>
          {/* students */}

          {StudentList.map((student, i) => {
            return (
              <div
                className="w-full grid grid-cols-6 items-center p-2 bg-white/10 rounded-md text-white/80 text-sm cursor-pointer"
                key={i}
                onClick={() => {
                  setFullDetailShow(student);
                  setRightSidebar(true);
                }}
              >
                <div className="w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden">
                  <img
                    src={student.profileImage}
                    alt={student.name}
                    className="w-full h-full"
                  />
                </div>
                <h1>{student.name}</h1>
                <h1>{student.Id}</h1>
                <h1>{student.ClassJourny.at(-1).ClassName}</h1>
                <h1>{student.email}</h1>
                <h1
                  className={`${student.ClassJourny.at(-1).feeState == "paid" ? " bg-green-400 text-green-800" : "bg-orange-300 text-orange-800"} w-max px-4 rounded-full`}
                >
                  {student.ClassJourny.at(-1).feeState}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
      {/* right side */}
      {/* each student information due to oncick function */}
      <aside
        className={`p-2 ${RightSidebar ? "" : "xl:translate-x-170 translate-x-full"} xl:w-170 text-sm duration-500 absolute top-0 text-white/50 right-0 bottom-0 bg-slate-950 p-4`}
      >
        <div className="w-full h-full flex flex-col gap-4 items-center relative">
          {/* toggler */}
          <button
            className="py-4 text-white/50 bg-white/20 cursor-pointer absolute -left-7  rounded-l-xl"
            onClick={() => {
              RightSidebar ? setRightSidebar(false) : setRightSidebar(true);
            }}
          >
            <LuChevronLeft
              className={` ${RightSidebar ? "rotate-180" : "rotate-0"} duration-500`}
            />
          </button>
          {/* profile detail */}
          <div className="w-full flex items-center justify-around gap-6 p-4 ">
            <div className="rounded-xl border w-40 h-40 srhink-0 overflow-hidden ">
              <img
                src={fullDetailShow.profileImage}
                alt={fullDetailShow.name}
                className="w-full h-full duration-400"
              />
            </div>
            <div className=" flex flex-col gap-2">
              <h1>ID : {fullDetailShow.Id}</h1>
              <h1 className=" text-white/50">Name : {fullDetailShow.name}</h1>
              <h1>Lastname : {fullDetailShow.lastname}</h1>
              <h1>Father Name : {fullDetailShow.fathername}</h1>
              <div className="flex items-center w-full gap-4">
                <a
                  href={fullDetailShow.phone}
                  className="flex items-center gap-2"
                >
                  <p>phone</p> <LuPhoneCall />
                </a>
                <a
                  href={fullDetailShow.email}
                  className="flex items-center gap-2"
                >
                  <p>email</p>
                  <LuMail />
                </a>
              </div>
              <p className="w-full">joined at : {fullDetailShow.joinDate}</p>
              <p className="w-full">
                Student State : {fullDetailShow.presence}
              </p>
            </div>
          </div>

          <div className="flex w-full items-center justify-between"></div>
          <h1 className="w-full">The learning journy is : </h1>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-9 items-center p-2 w-full px-4">
              <small>No</small>
              <small>Level</small>
              <small>M/t</small>
              <small>F/T</small>
              <small>Round</small>
              <small>Fee</small>
              <small>Bill No</small>
              <small>F/State</small>
              <small>Teacher</small>
            </div>
            {fullDetailShow.ClassJourny.map((item, i) => {
              return (
                <div
                  className={`grid grid-cols-9 relative p-2 items-center text-white/40 border rounded-md p-1 px-4 ${fullDetailShow.ClassJourny.length - 1 == i ? "bg-green-900/40 border-green-400 text-white" : null}`}
                  key={i}
                >
                  <small>{i + 1}</small>
                  <small className="">{item.ClassName}</small>
                  <small>{item.middleTestScore}</small>
                  <small>{item.finalTestScore}</small>
                  <small>{item.round}</small>
                  <small>{item.fee}</small>

                  <small>{item.billNumber}</small>
                  <small
                    className={`${item.feeState == "paid" ? "bg-green-300 text-black" : "bg-red-300 text-red-700"} w-max px-4 rounded-md`}
                  >
                    {item.feeState}
                  </small>
                  <small>{item.teacher}</small>
                  <span
                    className={`${fullDetailShow.ClassJourny.length - 1 == i ? "flex" : "hidden"} flex absolute left-1 w-2 h-2 z-30 rounded-full bg-green-700`}
                  ></span>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Students;
