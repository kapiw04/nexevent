import EventSection from "../components/events/EventSection";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../hooks/AuthContext";

export default function MyEvents() {
    const [events, setEvents] = useState([]);
    const { isLoggedIn, logIn, logOut } = useContext(AuthContext);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/events/users-events/", {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                });
                setEvents(response.data);
            } catch (error) {
                console.error(error);
                window.location.href = "/login";
            }
        }
        fetchEvents();
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            window.location.href = "/login";
        }
    }, [isLoggedIn]);



    if (events.length === 0) {
        return (
            <div>
                <h1 className="text-3xl text-center mt-16">You have no events</h1>
            </div >
        );
    }
    else {
        return (
            <div>
                <EventSection events={events} />
            </div>
        );
    }
}