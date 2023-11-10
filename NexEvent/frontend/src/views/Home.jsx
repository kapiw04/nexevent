import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarButton from "../components/navbar/NavbarButton";
import Navbar from "../components/navbar/Navbar";
import EventCard from "../components/events/EventCard";

export default function Home() {
  const [userData, setUserData] = useState(null);

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
          setUserData(response.data);
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

  return (
    <div>
      <EventSection />
    </div>
  );
}

function EventSection() {
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
      <div className="flex justify-center flex-wrap">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            name={event.name}
            description={event.description}
            date={event.start_date}
            location={event.location}
          />
        ))}
      </div>
    </div>
  );
}
