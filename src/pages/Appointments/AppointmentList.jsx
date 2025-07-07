
import React from "react";
import { useApp } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const AppointmentList = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { patientId } = useParams();

  const list = patientId
    ? state.incidents.filter((i) => i.patientId === patientId)
    : state.incidents;

  const handleDelete = (id) => {
    if (window.confirm("Delete appointment?")) {
      dispatch({ type: "DELETE_INCIDENT", payload: id });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {patientId ? "Patient" : "All"} Appointments
        </h2>
        <button
          onClick={() => navigate(patientId ? `/patients/${patientId}/appointments/new` : "/appointments/new")}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add Appointment
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((i) => (
            <tr key={i.id} className="border-t">
              <td className="p-2">{i.title}</td>
              <td className="p-2">{new Date(i.appointmentDate).toLocaleString()}</td>
              <td className="p-2">{i.status}</td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-0.5 rounded"
                  onClick={() => navigate(`/appointments/${i.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-0.5 rounded"
                  onClick={() => handleDelete(i.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
