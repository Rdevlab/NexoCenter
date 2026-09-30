import React from "react";
import StudentList from "../../../../Constants/Studetns.json";
const TeacherStudents = (props) => {
  return (
    <div className="text-white flex flex-col gap-2 overflow-scroll w-full p-6">
      <header className="w-full p-1 text-center font-bold text-xl rounded-md">
        <h1>Student List</h1>
      </header>

      <div className="w-full h-full flex flex-wrap gap-1 overflow-scroll">
        {StudentList.map((st, i) => {
          return st.ClassJourny.at(-1).teacher === props.logedInPerson.Id ? (
            <div
              key={i}
              className="w-full h-max flex  p-4 gap-4 bg-gray-900 items-center rounded-md text-sm"
            >
              <div className="xl:w-14 xl:h-14 w-10 h-10 rounded-full overflow-hidden shrink-0 border">
                <img src={st.profileImage} alt="-" className="w-full h-full" />
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex  gap-2 items-center">
                  <h1 className="font-bold">{st.name}</h1>
                  <h1 className="font-bold">{st.fathername}</h1>
                </div>
                <span className="">{st.ClassJourny.at(-1).ClassName}</span>
              </div>
              <div className="flex w-full items-end justify-center flex-col gap-2">
                <p>{st.presence}</p>
                <p>{st.ClassJourny.at(-1).time}</p>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default TeacherStudents;
