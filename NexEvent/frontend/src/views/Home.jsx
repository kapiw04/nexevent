import React, { useState, useEffect } from "react";
import axios from "axios";
import EventSection from "../components/events/EventSection";

export default function Home() {
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

