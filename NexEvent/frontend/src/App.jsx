import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Login from "./views/Login";
import Home from "./views/Home";
import Signup from "./views/SignUp";
import MyEvents from "./views/MyEvents";
import EventDetails from "./views/EventDetails";
import { AuthProvider } from "./hooks/AuthContext";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/my-events" element={<MyEvents />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}
