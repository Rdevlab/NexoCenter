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
    <aside className="relative z-30 w-full shrink-0 border-t border-white/10 bg-gray-950/95 shadow-[0_-10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl xl:h-full xl:w-auto xl:border-r xl:border-t-0 xl:shadow-none">
      <nav
        aria-label="Teacher navigation"
        className={`flex w-full justify-start gap-1 overflow-x-auto p-2.5 text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:h-full xl:flex-col xl:justify-start xl:gap-2 xl:overflow-x-hidden xl:overflow-y-auto xl:p-3 ${showFull ? "xl:w-60" : "xl:w-[4.5rem]"}`}
      >
        <div
          className={`hidden h-12 shrink-0 items-center gap-3 border-b border-white/10 px-2 pb-3 xl:flex ${showFull ? "justify-start" : "justify-center"}`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-300/10 text-emerald-300">
            <LuGraduationCap className="h-5 w-5" />
          </span>
          {showFull && (
            <span className="min-w-0 truncate text-sm font-semibold text-white">
              Faculty portal
            </span>
          )}
        </div>
        {sidelinks.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `group flex h-14 w-[4.25rem] shrink-0 flex-col items-center justify-center gap-1 rounded-lg text-[10px] font-medium transition-colors xl:h-11 xl:w-full xl:flex-row xl:justify-start xl:gap-3 xl:px-3 xl:text-sm ${
                isActive
                  ? "bg-emerald-300/10 text-emerald-200 ring-1 ring-inset ring-emerald-300/20"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white"
              } ${showFull ? "xl:justify-start" : "xl:justify-center xl:px-0"}`
            }
            key={item.path}
            to={item.path}
            title={!showFull ? item.title : undefined}
          >
            <item.Icons className="h-[18px] w-[18px] shrink-0 transition-transform group-hover:scale-105" />
            <span
              className={`max-w-full truncate leading-none ${showFull ? "xl:block" : "xl:sr-only"}`}
            >
              {item.title}
            </span>
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        aria-label={
          showFull ? "Collapse teacher navigation" : "Expand teacher navigation"
        }
        aria-expanded={showFull}
        className="absolute -top-3 right-3 z-40 hidden h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-gray-800 text-white/70 shadow-md transition-colors hover:bg-gray-700 hover:text-white xl:flex xl:-right-3 xl:top-5"
        onClick={() => setShowFull((isExpanded) => !isExpanded)}
      >
        <BiChevronRight
          aria-hidden="true"
          size={16}
          className={`transition-transform duration-300 ${showFull ? "rotate-180" : "rotate-0"}`}
        />
      </button>
    </aside>
  );
};

export default TeacherSidebar;
