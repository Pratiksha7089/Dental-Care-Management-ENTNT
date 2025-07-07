// === File: src/pages/Patients.jsx ===
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", dob: "", contact: "", healthInfo: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(saved);
  }, []);

  const savePatients = (data) => {
    localStorage.setItem("patients", JSON.stringify(data));
    setPatients(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      const updated = patients.map((p) => (p.id === form.id ? form : p));
      savePatients(updated);
    } else {
      const newPatient = { ...form, id: uuidv4() };
      savePatients([...patients, newPatient]);
    }
    setForm({ id: "", name: "", dob: "", contact: "", healthInfo: "" });
    setEditing(false);
  };

  const handleEdit = (patient) => {
    setForm(patient);
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      const filtered = patients.filter((p) => p.id !== id);
      savePatients(filtered);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Patients</h2>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">{editing ? "Edit Patient" : "Add Patient"}</h3>
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="date"
          className="border p-2 w-full mb-2"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Contact Info"
          className="border p-2 w-full mb-2"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Health Info"
          className="border p-2 w-full mb-2"
          value={form.healthInfo}
          onChange={(e) => setForm({ ...form, healthInfo: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? "Update" : "Add"} Patient
        </button>
      </form>

      {patients.length ? (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Contact</th>
              <th>Health</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-t">
                <td>{p.name}</td>
                <td>{p.dob}</td>
                <td>{p.contact}</td>
                <td>{p.healthInfo}</td>
                <td>
                  <button className="text-blue-600 mr-2" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients found.</p>
      )}
    </div>
  );
};
export default Patients;
