import React from "react";
import StudentList from "../../../../Constants/Studetns.json";
const TeacherStudents = (props) => {
  return (
    <div className="text-white flex flex-col gap-2 w-full p-6 pl-14 xl:pl-6">
      <header className="w-full p-1 text-center font-bold text-xl rounded-md">
        <h1>Student List</h1>
      </header>

      {StudentList.map((st, i) => {
        return st.ClassJourny.at(-1).teacher === props.logedInPerson.Id ? (
          <div
            key={i}
            className="w-full flex p-2 gap-2 bg-gray-800 items-center rounded-md"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border">
              <img src={st.profileImage} alt="-" className="w-full h-full" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <h1 className="font-bold">{st.name}</h1>
                <h1 className="">{st.lastname}</h1>
                <h1>{st.presence}</h1>
              </div>
              <div>
                <span>{st.ClassJourny.at(-1).ClassName}</span>
              </div>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default TeacherStudents;
