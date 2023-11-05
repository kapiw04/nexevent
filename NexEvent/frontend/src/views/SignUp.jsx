import React, { useState } from "react";
import NavbarButton from "../components/navbar/NavbarButton";
import axios from "axios";
import logo from "../assets/nexevent-logo.png";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  const handleSignUp = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (password !== password2) {
      newErrors["password"] = "Passwords do not match";
    }
    if (password.length < 8) {
      newErrors["password"] = "Password must be at least 8 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        username,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } catch (error) {
      newErrors["username"] = error.response.data.error;
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex justify-start items-center h-screen flex-col">
      <img src={logo} alt="" className="w-56" />

      <form
        className="flex flex-col p-8 justify-center items-center bg-gray-100 rounded-lg shadow-lg space-y-6"
        method="POST"
        onSubmit={(e) => {
          handleSignUp(e);
        }}
      >
        <h1 className="text-7xl mb-6 p-8">Sign up</h1>
        <div className="flex flex-col justify-center items-center">
          <div className="text-center  mb-6">
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              className="p-1 mt-6 rounded-lg border-solid border-2 border-gray-400 focus:border-blue-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors["username"] && (
              <p className="text-red-500">{errors["username"]}</p>
            )}
          </div>
          <div className="text-center">
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="p-1 mt-2 rounded-lg border-solid border-2 border-gray-400 focus:border-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors["password"] && (
              <p className="text-red-500">{errors["password"]}</p>
            )}
          </div>
          <div className="text-center mb-6">
            <input
              type="password"
              placeholder="Confirm password"
              name="password2"
              id="password2"
              className="p-1 mt-2 rounded-lg border-solid border-2 border-gray-400 focus:border-blue-600"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            {errors["password"] && (
              <p className="text-red-500">{errors["password"]}</p>
            )}
          </div>
        </div>
        <NavbarButton outline={true} type="submit" to="/">
          Sign up
        </NavbarButton>
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
