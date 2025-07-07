import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("incidents")) || [];
    const myAppointments = all.filter((a) => a.patientId === user.patientId);
    setAppointments(myAppointments);
  }, []);

  const upcoming = appointments.filter(
    (a) => new Date(a.appointmentDate) > new Date()
  );
  const history = appointments.filter(
    (a) => new Date(a.appointmentDate) <= new Date()
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome, <span className="text-blue-600">{user.email}</span>
      </h1>

      {/* Profile Button */}
      <div className="mb-8">
        <Link
          to="/profile"
          className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          View My Profile
        </Link>
      </div>

      {/* Upcoming Appointments */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Upcoming Appointments
        </h2>
        {upcoming.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-blue-100 text-blue-900">
                <tr>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Appointment Date</th>
                  <th className="px-4 py-2 border">Next Appointment</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {upcoming.map((a) => (
                  <tr key={a.id} className="hover:bg-blue-50">
                    <td className="px-4 py-2 border">{a.title}</td>
                    <td className="px-4 py-2 border">
                      {moment(a.appointmentDate).format("DD-MM-YYYY hh:mm A")}
                    </td>
                    <td className="px-4 py-2 border">
                      {a.nextAppointmentDate
                        ? moment(a.nextAppointmentDate).format(
                            "DD-MM-YYYY hh:mm A"
                          )
                        : "—"}
                    </td>
                    <td className="px-4 py-2 border">{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No upcoming appointments.</p>
        )}
      </section>

      {/* Appointment History */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Appointment History
        </h2>
        {history.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-green-100 text-green-900">
                <tr>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Treatment</th>
                  <th className="px-4 py-2 border">Cost</th>
                  <th className="px-4 py-2 border">Files</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {history.map((a) => (
                  <tr key={a.id} className="hover:bg-green-50">
                    <td className="px-4 py-2 border">{a.title}</td>
                    <td className="px-4 py-2 border">{a.description}</td>
                    <td className="px-4 py-2 border">{a.treatment || "—"}</td>
                    <td className="px-4 py-2 border">₹{a.cost || "—"}</td>
                    <td className="px-4 py-2 border">
                      {a.files?.length ? (
                        <ul className="space-y-1">
                          {a.files.map((f, i) => (
                            <li key={i}>
                              <a
                                href={f.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                {f.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No past appointment records.</p>
        )}
      </section>
    </div>
  );
};

export default PatientDashboard;
