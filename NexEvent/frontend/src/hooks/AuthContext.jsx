import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

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


    const logIn = () => {
        setIsLoggedIn(true);
    };

    const logOut = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        console.log("Logged out!");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}