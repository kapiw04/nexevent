import NavbarButton from "./NavbarButton";
import logo from "../../assets/nexevent-logo.png";
import React, { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleTokenChange = (event) => {
      console.log('Storage event', event);
    };

    window.addEventListener('tokenChanged', handleTokenChange);

    // Initial check on mount
    setIsLoggedIn(!!localStorage.getItem("token"));

    return () => {
      window.removeEventListener('tokenChanged', handleTokenChange);
    };
  }, []);




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
        {isLoggedIn ? (
          <NavbarButton
            onClick={() => {
              localStorage.removeItem("token");
              window.dispatchEvent(new Event("tokenChanged"));
              setIsLoggedIn(false);
            }}
            outline={true}
          >
            Log Out
          </NavbarButton>
        ) : (
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
        )
        }
      </div>
    </nav>
  );
}


export default Navbar;
