import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherList from "../../Constants/Teachers.json";
import {
  LuArrowRight,
  LuEye,
  LuEyeOff,
  LuGraduationCap,
  LuLockKeyhole,
  LuShieldCheck,
  LuUserRound,
} from "react-icons/lu";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = TeacherList.find(
      (teacher) =>
        String(teacher.Id).trim() === username.trim() &&
        String(teacher.password) === password,
    );

    if (!foundUser) {
      setError("That username and password don’t match. Please try again.");
      return;
    }
    const { password: _password, ...userWithoutPassword } = foundUser;
    props.setLogedInPerson(userWithoutPassword);

    if (foundUser.Role === "Admin") {
      navigate("/Admin/Dashboard");
    } else if (foundUser.Role === "teacher") {
      navigate("/Teacher/Dashboard");
    } else {
      setError("This account doesn’t have access to the dashboard.");
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 text-white sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-36 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_55%)]" />
      </div>

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/50 backdrop-blur-xl lg:grid-cols-[1fr_0.9fr]">
        <section className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-gradient-to-br from-cyan-950 via-slate-900 to-indigo-950 p-10 lg:flex xl:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]"
          />
          <div
            aria-hidden="true"
            className="absolute -right-28 top-24 h-80 w-80 rounded-full border border-cyan-200/10"
          />
          <div
            aria-hidden="true"
            className="absolute -right-16 top-36 h-56 w-56 rounded-full border border-cyan-200/10"
          />

          <div className="relative z-10 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200 shadow-lg shadow-cyan-950/30">
              <LuGraduationCap size={25} />
            </span>
            <div>
              <p className="font-bold tracking-wide text-white">Nexo</p>
              <p className="text-xs text-slate-400">Educational Center</p>
            </div>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/[0.06] px-3 py-1.5 text-xs font-medium text-cyan-100">
              <LuShieldCheck size={15} />
              Your learning community
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
              A brighter way to
              <span className="mt-1 block bg-gradient-to-r from-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                teach and learn.
              </span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              Sign in to manage your classes, support your students, and keep
              your learning journey moving forward.
            </p>
          </div>

          <p className="relative z-10 text-xs text-slate-500">
            A connected space for educators and learners
          </p>
        </section>

        <section className="flex items-center justify-center p-5 sm:p-8 lg:p-10 xl:p-12">
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200">
                <LuGraduationCap size={23} />
              </span>
              <div>
                <p className="font-bold text-white">Nexo</p>
                <p className="text-xs text-slate-400">Educational Center</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Welcome back
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                Sign in to Nexo
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Enter your account details to continue to your dashboard.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Username
                </label>
                <div className="relative">
                  <LuUserRound
                    aria-hidden="true"
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    autoCapitalize="none"
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your username"
                    className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Password
                </label>
                <div className="relative">
                  <LuLockKeyhole
                    aria-hidden="true"
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    {showPassword ? (
                      <LuEyeOff size={18} />
                    ) : (
                      <LuEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/30 active:scale-[0.99]"
              >
                Sign in
                <LuArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-slate-500">
              Secure access for authorized educators and administrators.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
};

export default LoginForm;
