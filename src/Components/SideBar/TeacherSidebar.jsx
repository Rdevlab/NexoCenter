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
    path: "/Teacher/Dashboard",
    Icons: LuLayoutDashboard,
  },
  {
    title: "Students",
    path: "/Teacher/Students",
    Icons: LuGraduationCap,
  },

  {
    title: "Classes",
    path: "/Teacher/Classes",
    Icons: LuBookOpen,
  },

  {
    title: "Exams",
    path: "/Teacher/Exams",
    Icons: LuFileQuestion,
  },

  {
    title: "Settings",
    path: "/Teacher/Settings",
    Icons: LuSettings,
  },
];
const TeacherSidebar = () => {
  const [showFull, setShowFull] = useState(false);
  return (
    <div className="flex xl:border-r border-white/10 justify-center justify-start xl:relative absolute backdrop-blur-xl h-max xl:h-full w-full xl:w-max  bottom-0 z-10  ">
      {/* nav main content side */}
      <div
        className={` flex overflow-hidden justify-center xl:flex-col xl:p-4 p-2 text-sm  ${showFull ? "xl:w-34 w-full " : "xl:w-14 w-full"} duration-500 xl:py-6 xl:h-max  h-max  gap-6`}
      >
        {sidelinks.map((item, i) => {
          return (
            <NavLink
              className={({ isActive }) => {
                return `flex flex-col xl:flex-row items-center gap-2 duration-500 ${
                  isActive ? "text-[var(--green)]" : "text-white"
                }`;
              }}
              key={i}
              to={item.path}
            >
              <item.Icons className="shrink-0" size={20} />
              <span
                className={`${showFull ? "flex xl:animate-[sidelinkappear_.5s_.4s_ease_forwards]" : "xl:animate-[sidelinkdisappear_.4s_ease_forwards]"}  xl:opacity-0 flex duration-400 `}
              >
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </div>
      {/* nav content toggler button */}
      <button
        className="hidden xl:flex py-4 bg-white/10 w-max h-max rounded-r-xl -right-5 top-12 cursor-pointer absolute hover:bg-white/20 duration-500"
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

export default TeacherSidebar;
