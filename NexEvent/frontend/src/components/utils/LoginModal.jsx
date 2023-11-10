import { useState } from "react";
import axios from "axios";
import NavbarButton from "../navbar/NavbarButton";

export default function LoginModal({ setShowLoginModal }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:8000/api/users/login/",
                {
                    username,
                    password,
                }
            );
            localStorage.setItem("token", response.data.token);
            window.dispatchEvent(new Event("loginSuccess"));
            setShowLoginModal(false);
            console.log("Logged in successfully!");
        } catch (error) {
            setError("Failed to login. Please check your username and password.");
            console.error("Error logging in:", error);
        }
        setIsLoading(false);
    };

    return (
        <div className="justify-center items-center flex-col flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-500 bg-opacity-50">
            <form
                onSubmit={handleLogin}
                className="flex flex-col p-8 justify-center items-center bg-gray-100 rounded-lg shadow-lg space-y-6"
                method="POST"
            >
                <h1 className="text-7xl mb-6 p-8">Log in</h1>
                <div className="flex flex-col justify-center items-center">
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        id="username"
                        className="p-1 mt-6 rounded-lg border-solid border-2 border-gray-400 focus:border-blue-600"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        className="p-1 mt-2 mb-6 rounded-lg border-solid border-2 border-gray-400 focus:border-blue-600"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <NavbarButton outline={true} type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Log in'}
                </NavbarButton>
                <p className="text-gray-500">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-500">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
}
