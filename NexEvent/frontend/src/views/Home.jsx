import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarButton from "../components/navbar/NavbarButton";
import Navbar from "../components/navbar/Navbar";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/current-user/",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setUserData(response.data);
        } catch (error) {
          console.error(
            "Error fetching user data:",
            error.response || error.message
          );
          setError("Failed to fetch user data. Please log in again.");
          localStorage.removeItem("token"); // Clear token as it might be invalid
        }
      }
    };

    fetchUserData();
  }, []);

  const isLoggedIn = userData != null;

  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      {isLoggedIn ? (
        <h2>Welcome, {userData.username}!</h2>
      ) : (
        <>
          <h2>Welcome, guest!</h2>
          {error && <p className="error">{error}</p>}{" "}
          {/* Show error message if any */}
          <NavbarButton outline={false} to="/login" />
        </>
      )}
    </div>
  );
}
