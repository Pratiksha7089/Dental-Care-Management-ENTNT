
import React from "react";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Delete patient?")) {
      dispatch({ type: "DELETE_PATIENT", payload: id });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Patients</h2>
        <button
          onClick={() => navigate("/patients/new")}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add Patient
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">DOB</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.patients.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.dob}</td>
              <td className="p-2">{p.contact}</td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-0.5 rounded"
                  onClick={() => navigate(`/patients/${p.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-0.5 rounded"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-purple-500 text-white px-2 py-0.5 rounded"
                  onClick={() => navigate(`/patients/${p.id}/appointments`)}
                >
                  Appointments
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
