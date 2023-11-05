import NavbarButton from "../components/navbar/NavbarButton";
import { useState } from "react";
import axios from "axios";
import logo from "../assets/nexevent-logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <img src={logo} alt="" className="w-56" />
      <form
        onSubmit={handleLogin}
        className="flex flex-col p-8 justify-center items-center bg-gray-100 rounded-lg shadow-lg space-y-6"
        method="POST"
      >
        <h1 className="text-7xl mb-6 p-8">Log in</h1>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            className="p-1 mt-6 rounded-lg border-solid border-2 border-gray-400 focus:border-blue-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="p-1 mt-2 mb-6 rounded-lg border-solid border-2 border-gray-400 focus:border-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <NavbarButton outline={true} type="submit" to="/">
          Log in
        </NavbarButton>
        <p className="text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
