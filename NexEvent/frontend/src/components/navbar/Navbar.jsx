import NavbarButton from "./NavbarButton";
import logo from "../../assets/nexevent-logo.png";
import React, { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage changed!");
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (isLoggedIn) {
    return (
      <nav className="grid-cols-2 p-1 shadow-md">
        <div className="flex justify-between items-center">
          <img src={logo} alt="" className="w-32" />
          <div className="flex items-center space-x-4">
            <NavbarButton
              onClick={() => {
                window.location.href = "/";
              }}
              outline={false}
            >
              Home
            </NavbarButton>
            <NavbarButton
              onClick={() => {
                console.log("Events button clicked!");
              }}
              outline={false}
            >
              Events
            </NavbarButton>
          </div>
          <NavbarButton
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              window.location.href = "/";
            }}
            outline={true}
          >
            Log Out
          </NavbarButton>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="grid-cols-2 p-1">
        <div className="flex justify-between items-center">
          <img src={logo} alt="" className="w-32" />
          <div className="flex items-center space-x-4">
            <NavbarButton
              onClick={() => {
                window.location.href = "/";
              }}
              outline={false}
            >
              Home
            </NavbarButton>
            <NavbarButton
              onClick={() => {
                console.log("Events button clicked!");
              }}
              outline={false}
            >
              Events
            </NavbarButton>
          </div>
          <div className="flex ">
            <NavbarButton
              onClick={() => {
                window.location.href = "/login";
              }}
              outline={false}
            >
              Log in
            </NavbarButton>
            <NavbarButton
              onClick={() => {
                window.location.href = "/signup";
              }}
              outline={true}
            >
              Sign up
            </NavbarButton>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
