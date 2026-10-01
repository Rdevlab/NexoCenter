import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherList from "../../Constants/Teachers.json";
import { LuUser } from "react-icons/lu";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = TeacherList.find(
      (teacher) =>
        String(teacher.Id).trim() === username.trim() &&
        String(teacher.password) === password,
    );

    if (!foundUser) {
      alert("Invalid username or password");
      return;
    }
    const { password: _password, ...userWithoutPassword } = foundUser;
    props.setLogedInPerson(userWithoutPassword);

    foundUser.Role === "Admin"
      ? navigate("/Admin/Dashboard")
      : foundUser.Role === "teacher" && navigate("/Teacher/Dashboard");
  };

  return (
    <div className="w-full h-screen flex pt-10 xl:pt-0 xl:items-center justify-center overflow-scroll bg-fixed bg-[url('https://images.unsplash.com/photo-1712397943847-e104395a1a8b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGJsdWUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww')] bg-cover bg-center">
      <div className="flex flex-col xl:flex-row h-110">
        <div className="xl:w-80 w-70 hidden xl:flex xl:h-full backdrop-blur-xl rounded-xl border-8 border-white/3 flex items-center justify-center text-white p-4 bg-white relative">
          <img src="./logo.png" alt="" />
        </div>
        <form
          onSubmit={handleLogin}
          className="p-2 rounded-xl shadow-xl border-white/30 backdrop-blur-xl bg-white/2 flex flex-col xl:gap-4 xl:w-96 w-70 h-max flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center p-4 rounded-full border text-gray-700/10 shadow-xl bg-white/5">
            <LuUser size={50} className="text-gray-500" />
          </div>
          <h1 className="font-bold text-xl text-white/60">Log in </h1>
          <div className="flex flex-col p-2 w-full gap-2">
            <label htmlFor="username" className="text-white/60">
              Your Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded-md border border-white/30 bg-transparent text-white/60 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col p-2 w-full gap-2">
            <label htmlFor="password" className="text-white/60">
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md border border-white/30 bg-transparent text-white/60 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 p-1 z-50 border rounded-md backdrop-blur-xl text-white/40 shadow-md cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
