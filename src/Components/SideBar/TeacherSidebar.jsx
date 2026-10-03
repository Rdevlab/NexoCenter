import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import {
  LuBookOpen,
  LuFileQuestion,
  LuGraduationCap,
  LuLayoutDashboard,
  LuUser,
} from "react-icons/lu";
import { NavLink } from "react-router-dom";

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
    title: "Me",
    path: "/Teacher/Settings",
    Icons: LuUser,
  },
];
const TeacherSidebar = () => {
  const [showFull, setShowFull] = useState(false);
  return (
    <div className="relative z-10 flex h-max w-full justify-start border-t border-white/10 bg-gradient-to-b from-slate-900/95 to-[#0b011d]/95 shadow-[0_-12px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl xl:h-full xl:w-max xl:border-r xl:border-t-0 xl:bg-transparent xl:shadow-none">
      {/* nav main content side */}
      <div
        className={`flex w-full items-stretch justify-around gap-1 overflow-hidden p-2 text-xs duration-500 xl:h-max xl:w-auto xl:flex-col xl:items-center xl:justify-center xl:gap-6 xl:p-4 xl:py-6 xl:text-sm ${showFull ? "xl:w-34" : "xl:w-14"}`}
      >
        {sidelinks.map((item, i) => {
          return (
            <NavLink
              className={({ isActive }) => {
                return `group flex min-w-0 flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl px-1.5 py-2 text-[10px] font-medium tracking-wide transition-all duration-200 active:scale-95 xl:flex-none xl:flex-row xl:gap-2 xl:rounded-full xl:px-0 xl:py-0 xl:text-sm xl:tracking-normal ${
                  isActive
                    ? "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-300/20 xl:bg-transparent xl:text-[var(--green)] xl:ring-0"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-white xl:text-white xl:hover:bg-transparent"
                }`;
              }}
              key={i}
              to={item.path}
            >
              <item.Icons className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 xl:h-3.5 xl:w-3.5 xl:group-hover:scale-100" />
              <span
                className={`${showFull ? "flex xl:animate-[sidelinkappear_.5s_.4s_ease_forwards]" : "xl:animate-[sidelinkdisappear_.4s_ease_forwards]"} flex whitespace-nowrap leading-none duration-300 xl:opacity-0`}
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
