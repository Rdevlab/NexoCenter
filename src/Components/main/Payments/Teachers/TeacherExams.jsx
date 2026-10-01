import React, { useState } from "react";
import examList from "../../../../Constants/Exams.json";
import { LuTimer } from "react-icons/lu";
const TeacherExams = (props) => {
  const teacher = props.logedInPerson.Id;
  const [toggler, setToggler] = useState(false);
  return (
    <div className="flex flex-col w-full h-full xl:p-6">
      <header className="w-full items-center justify-center flex  text-white font-bold text-center font-xl pt-6">
        <div className="w-90 p-2 px-4 border border-green-700 rounded-full flex gap-2 justify-between items-center relative duration-500">
          <button
            onClick={() => {
              setToggler(false);
            }}
            className={`w-1/2 flex items-center justify-center px-4 p-1 rounded-full z-10`}
          >
            Middle Test
          </button>
          <button
            onClick={() => {
              setToggler(true);
            }}
            className={`w-1/2 flex items-center justify-center px-4 p-1 rounded-full z-10`}
          >
            Final Test
          </button>
          <span
            className={`w-1/2 duration-300 absolute ${toggler ? "translate-x-[96%]" : "translate-x-0"} h-[80%] left-1 rounded-full bg-green-800 `}
          ></span>
        </div>
      </header>
      {!toggler ? (
        <div className="w-full flex flex-col gap-2 p-4 pb-16 h-full overflow-y-scroll">
          <h1 className="text-white font-bold">Middle tests</h1>
          {examList.map((ex, i) => {
            return (
              <div
                key={i}
                className="flex gap-4 flex-col overflow-scroll justify-start items-center p-4 rounded-xl shadow-lg border border-green-800 text-white"
              >
                <span className="px-4  flex rounded-lg border border-green-800 text-green-500 flex items-center justify-center  bg-white/5">
                  Round {ex.round}
                </span>
                {ex.middle_tests.map((md, i) => {
                  return (
                    md.teacher == teacher && (
                      <div className="flex items-center justify-between w-full">
                        <span className="w-10 h-10 p-2 flex items-center justify-center rounded-full bg-white/6 shadow-md">
                          {i + 1}
                        </span>
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-semibold">
                            {md.level}
                          </span>
                          <span>{md.date}</span>
                        </div>
                        <span
                          className={`${md.state == "upcoming" ? "bg-green-600" : "bg-orange-600"} px-3 rounded-full flex items-center gap-2 text-sm p-1`}
                        >
                          {md.state}
                          <span>
                            <LuTimer />
                          </span>
                        </span>
                      </div>
                    )
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2 p-4 pb-16 h-full overflow-y-scroll">
          <h1 className="text-white font-bold">Final Tests</h1>
          {examList.map((ex, i) => {
            return (
              <div
                key={i}
                className="flex gap-4 flex-col overflow-scroll justify-start items-center p-4 rounded-xl shadow-lg border border-white/20 text-white"
              >
                <span className="p-4 rounded-full border border-white/5 flex items-center justify-center w-10 h-10 bg-white/5">
                  {ex.round}
                </span>
                {ex.final_tests.map((md, i) => {
                  return (
                    md.teacher == teacher && (
                      <div className="flex items-center justify-between w-full">
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/6 shadow-md">
                          {i + 1}
                        </span>
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-semibold">
                            {md.level}
                          </span>
                          <span>{md.date}</span>
                        </div>
                        <span
                          className={`${md.state == "upcoming" ? "bg-green-600" : "bg-orange-600"} px-3 rounded-full flex items-center gap-2 text-sm p-1`}
                        >
                          {md.state}
                          <span>
                            <LuTimer />
                          </span>
                        </span>
                      </div>
                    )
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeacherExams;
