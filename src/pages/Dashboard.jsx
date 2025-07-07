import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const appts = JSON.parse(localStorage.getItem("incidents")) || [];
    const pats = JSON.parse(localStorage.getItem("patients")) || [];

    setAppointments(
      appts
        .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
        .slice(0, 10)
    );
    setPatients(pats);
    setRevenue(
      appts.reduce((acc, curr) => acc + (parseFloat(curr.cost) || 0), 0)
    );
    setCompleted(appts.filter((a) => a.status === "Completed").length);
    setPending(appts.filter((a) => a.status === "Pending").length);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome {user?.email}</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-gray-600">Patients</p>
          <h2 className="text-xl font-bold">{patients.length}</h2>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-gray-600">Upcoming Appointments</p>
          <h2 className="text-xl font-bold">{appointments.length}</h2>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-gray-600">Revenue</p>
          <h2 className="text-xl font-bold">₹{revenue}</h2>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <p className="text-gray-600">Completed / Pending</p>
          <h2 className="text-xl font-bold">
            {completed} / {pending}
          </h2>
        </div>
      </div>

      {/* Admin Buttons after summary */}
      {user?.role === "Admin" && (
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => window.location.href = "/appointments"}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
          >
            Manage Appointments
          </button>
          <button
            onClick={() => window.location.href = "/patients"}
            className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600"
          >
            Manage Patients
          </button>
          <button
            onClick={() => window.location.href = "/calendar"}
            className="bg-purple-500 text-white py-2 px-4 rounded shadow hover:bg-purple-600"
          >
            View Calendar
          </button>
        </div>
      )}

      {/* Next Appointments */}
      <h2 className="text-xl font-semibold mb-2">Next 10 Appointments</h2>
      {appointments.length ? (
        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Patient ID</th>
              <th className="p-2 border">Appointment Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Cost</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-2 border">{a.title}</td>
                <td className="p-2 border">{a.patientId}</td>
                <td className="p-2 border">
                  {new Date(a.appointmentDate).toLocaleString()}
                </td>
                <td className="p-2 border">{a.status}</td>
                <td className="p-2 border">₹{a.cost || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No upcoming appointments.</p>
      )}
    </div>
  );
};

export default Dashboard;
