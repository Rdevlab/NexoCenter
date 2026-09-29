import React, { useState } from "react";
import PayementsChart from "../Charts/PayementsChart";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import StudentsPayments from "./Payments/StudentsPayments";
import TeacherPayments from "./Payments/TeacherPayments";

const Payments = () => {
  const [payemtsDetail, setPaymentDetail] = useState(true);
  return (
    <div className="w-full flex flex-col h-full text-white font-2xl p-6 gap-12 overflow-y-scroll">
      <div className="w-full h-90">
        <PayementsChart w={"w-full"} />
      </div>
      <nav className="w-full h-max flex items-center justify-center bg-white/20 shrink-0 p-2 rounded-xl">
        <div className="flex items-center relative">
          <button
            className="px-4 p-1 rounded-md cursor-pointer z-4"
            onClick={() => {
              payemtsDetail ? _ : setPaymentDetail(true);
            }}
          >
            Students Fees Payments
          </button>
          <button
            className="px-4 p-1 rounded-md cursor-pointer cursor-pointer z-4"
            onClick={() => {
              payemtsDetail ? setPaymentDetail(false) : _;
            }}
          >
            Teachers salary payments
          </button>
          <span
            className={`w-1/2 h-full absolute z-1 ${payemtsDetail ? "translate-x-0" : "translate-x-full"} bg-green-800 rounded-xl  duration-500`}
          ></span>
        </div>
      </nav>
      <div className="w-full h-full">
        {payemtsDetail ? <StudentsPayments /> : <TeacherPayments />}
      </div>
    </div>
  );
};

export default Payments;
