import EventSection from "../components/events/EventSection";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MyEvents() {
    const [events, setEvents] = useState([]);

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

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get("http://localhost:8000/api/events/users-events/", {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            }
            );
            setEvents(response.data);
        }

        fetchEvents();
    }, []);

    return (
        <div>
            <EventSection events={events} />
        </div>
    );
}