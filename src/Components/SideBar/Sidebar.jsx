import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { BsFileBarGraph } from "react-icons/bs";
import {
  LuBookOpen,
  LuCalendarRange,
  LuClipboardCheck,
  LuFileQuestion,
  LuGraduationCap,
  LuLayoutDashboard,
  LuMessageCircle,
  LuSettings,
  LuUsers,
  LuWallet,
} from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";

const sidelinks = [
  {
    title: "Dashboard",
    path: "/Admin/Dashboard",
    Icons: LuLayoutDashboard,
  },
  {
    title: "Students",
    path: "/Admin/Students",
    Icons: LuGraduationCap,
  },
  {
    title: "Teachers",
    path: "/Admin/Teachers",
    Icons: LuUsers,
  },
  {
    title: "Classes & Courses",
    path: "/Admin/Classes & Courses",
    Icons: LuBookOpen,
  },

  {
    title: "Exams & Grades",
    path: "/Admin/Exams & Grades",
    Icons: LuFileQuestion,
  },
  {
    title: "Payments & Fees",
    path: "/Admin/Payments & Fees",
    Icons: LuWallet,
  },
  {
    title: "Communication",
    path: "/Admin/Communication",
    Icons: LuMessageCircle,
  },
  {
    title: "Schedule",
    path: "/Admin/Schedule",
    Icons: LuCalendarRange,
  },
  {
    title: "Reports",
    path: "/Admin/Reports",
    Icons: BsFileBarGraph,
  },

  {
    title: "Settings",
    path: "/Admin/Settings",
    Icons: LuSettings,
  },
];
const Sidebar = () => {
  const [showFull, setShowFull] = useState(false);
  return (
    <div className="flex shrink-0 border-r border-white/10 relative">
      {/* nav main content side */}
      <div
        className={`shrink-0 flex flex-col p-4 text-sm  ${showFull ? "w-50 " : "w-14"} duration-500 py-6 h-full gap-6`}
      >
        {sidelinks.map((item, i) => {
          return (
            <NavLink
              className={({ isActive }) => {
                return `shrink-0 flex items-center gap-2 hover:text-red-500 duration-500 ${
                  isActive ? "text-[var(--green)]" : "text-white"
                }`;
              }}
              key={i}
              to={item.path}
            >
              <item.Icons className="shrink-0" size={20} />
              <span
                className={`${showFull ? "flex animate-[sidelinkappear_.5s_.4s_ease_forwards]" : "animate-[sidelinkdisappear_.4s_ease_forwards]"}   opacity-0 shrink-0 flex duration-400 `}
              >
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </div>
      {/* nav content toggler button */}
      <button
        className=" py-4 bg-white/10 rounded-r-xl -right-5 top-12 cursor-pointer absolute hover:bg-white/20 duration-500"
        onClick={() => {
          showFull ? setShowFull(false) : setShowFull(true);
        }}
      >
        <BiChevronRight
          size={20}
          className={`${showFull ? "rotate-180" : "rotate-0"} duration-500 text-white/50`}
        />
      </button>
    </div>
  );
};

export default Sidebar;
