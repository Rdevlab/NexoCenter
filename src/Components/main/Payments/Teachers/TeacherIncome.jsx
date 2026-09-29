import { React, useState } from "react";
import StudentList from "../../../../Constants/Studetns.json";
const TeacherIncome = (props) => {
  const [income, setIncome] = useState(0);

  return (
    <div className="text-white flex flex-col gap-4 w-full p-4">{income}</div>
  );
};

export default TeacherIncome;
