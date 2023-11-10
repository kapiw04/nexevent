import React, { useState, useEffect } from "react";
import axios from "axios";
import EventSection from "../components/events/EventSection";

export default function Home() {
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/users/current-user/",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
        } catch (error) {
          console.error(
            "Error fetching user data:",
            error.response || error.message
          );
          setError("Failed to fetch user data. Please log in again.");
          localStorage.removeItem("token");
        }
      }
    };

    fetchUserData();
  }, []);

  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:8000/api/events/");
    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <EventSection events={events} />
    </div>
  );
}

