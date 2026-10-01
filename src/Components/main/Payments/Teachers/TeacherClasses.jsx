import React from "react";

const TeacherClasses = (props) => {
  const classes = props.logedInPerson.classes;
  return (
    <div className="flex flex-col w-full h-full xl:p-6 overflow-hidden justify-center items-center">
      <header className="w-full text-white font-bold text-center font-xl p-4">
        My Classes
      </header>
      <div className="w-full h-full flex flex-col gap-2 overflow-scroll p-2">
        {classes.map((cls, i) => {
          return (
            <div
              key={i}
              className="w-full flex p-2 gap-8 px-6 text-white/60 border border-white/6 rounded-xl items-center shadow-md"
            >
              <span className="w-10 h-10 text-xl font-bold rounded-full bg-white/2 shadow-md flex items-center justify-center">
                {i + 1}
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-xl font-semibold">{cls.levelName}</span>
                <span>{cls.time}</span>
              </div>
              <span className="flex gap-4 items-center">
                {cls.classState}{" "}
                <span
                  className={`w-4 h-4 rounded-full ${cls.classState == "Inprogress" ? "bg-green-700" : "bg-red-700"}`}
                ></span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherClasses;
