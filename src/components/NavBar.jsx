import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        {user.role === "Admin" && (
          <>
            <Link to="/patients">Patients</Link>
            <Link to="/appointments">Appointments</Link>
            <Link to="/calendar">Calendar</Link>
          </>
        )}
        {user?.role === "Patient" && (
  <Link to="/profile" className="px-3 py-2 hover:underline">
    My Profile
  </Link>
)}

        {user.role === "Patient" && <Link to="/profile">My Profile</Link>}
      </div>
      <button
        className="bg-white text-blue-600 px-3 py-1 rounded"
        onClick={() => {
          localStorage.removeItem("currentUser");
          navigate("/login");
        }}

      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;