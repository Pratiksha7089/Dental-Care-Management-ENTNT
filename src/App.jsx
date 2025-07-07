// === File: src/App.jsx ===
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile"; // ✅ This is the editable profile page

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowed={["Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute allowed={["Admin"]}>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute allowed={["Admin"]}>
              <Patients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute allowed={["Admin"]}>
              <Calendar />
            </ProtectedRoute>
          }
        />

        {/* Patient Routes */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute allowed={["Patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowed={["Patient"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
