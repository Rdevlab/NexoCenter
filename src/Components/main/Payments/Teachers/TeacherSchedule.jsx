import React from "react";
import timeTable from "../../../../Constants/timeTable.json";
import { Link } from "react-router-dom";
import { LuBookCheck, LuCalendar1, LuChevronLeft } from "react-icons/lu";

const TeacherSchedule = () => {
  return (
    <div className="text-white w-full h-full overflow-scroll flex flex-col gap-2 p-4 pb-20">
      <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between sm:left-6 sm:right-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-4 rounded-2xl backdrop-blur-xl border border-white/10">
        <Link
          to={"/Teacher/Dashboard/"}
          aria-label="Back to login"
          title="Back to login"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/40 text-white shadow-lg backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <LuChevronLeft size={20} />
        </Link>
        <h1 className="font-bold px-4  text-xl text-slate-600">
          Classes Timetables
        </h1>
      </div>
      <div className="w-full flex items-center justify-center text-slate-600 flex flex-col gap-2 pt-24">
        {timeTable.map((item, i) => {
          return (
            <div className="p-2 rounded-xl bg-white/3 backdrop-blur-md w-full flex flex-col ">
              <div className="w-full p-2 flex justify-between items-center border-b border-slate-700">
                <LuCalendar1 size={22} className="text-blue-800" />
                <p className="text-2xl font-bold">{item.levelName}</p>
              </div>
              <ul className="w-full h-max flex flex-col gap-1 pt-3">
                {item.week.map((day, i) => {
                  return (
                    <ul className="font-bold text-slate-500 p-2 border  w-full  border-white/6 gap-2 flex flex-col rounded-xl">
                      <p className="flex  items-center justify-center gap-2">
                        <LuBookCheck />
                        {day.day}
                      </p>
                      <ul className="flex  gap-2 px-6 flex-col">
                        {day.content.map((title, i) => {
                          return (
                            <li className="font-semibold flex items-center gap-2">
                              <p className="flex items-center justify-center rounded-full border p-2 text-xs w-5 h-5 text-green-700">
                                {i + 1}
                              </p>

                              {title}
                            </li>
                          );
                        })}
                      </ul>
                    </ul>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherSchedule;
