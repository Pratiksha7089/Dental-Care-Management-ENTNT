import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");

  // 🟢 Demo users with patientId for patients
  const users = [
    { email: "admin@entnt.in", password: "admin123", role: "Admin" },
    { email: "john@entnt.in", password: "patient123", role: "Patient", patientId: "p1" },
    { email: "jane@entnt.in", password: "patient123", role: "Patient", patientId: "p2" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (!user) {
      alert("Invalid credentials or role");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    //localStorage.setItem("currentUser", JSON.stringify(user));

    // ✅ Redirect based on role
    if (user.role === "Admin") {
      navigate("/dashboard");
    } else {
      navigate("/patient");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Role toggle buttons */}
        <div className="flex mb-6">
          {["Admin", "Patient"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 p-2 border ${
                role === r ? "bg-blue-500 text-white" : "bg-gray-200"
              } ${r === "Admin" ? "rounded-l" : "rounded-r"}`}
            >
              {r}
            </button>
          ))}
        </div>

        <label className="block text-sm mb-1">Email</label>
        <input
          className="w-full border p-2 rounded mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block text-sm mb-1">Password</label>
        <input
          className="w-full border p-2 rounded mb-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login as {role}
        </button>
      </form>
    </div>
  );
};

export default Login;
