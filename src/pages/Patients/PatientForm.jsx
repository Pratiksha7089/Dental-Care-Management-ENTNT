
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { v4 as uuidv4 } from "uuid";

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const editing = Boolean(id);
  const existing = state.patients.find((p) => p.id === id);

  const [form, setForm] = useState(
    existing || { id: "", name: "", dob: "", contact: "", healthInfo: "" }
  );

  useEffect(() => {
    if (editing && !existing) {
      navigate("/patients");
    }
  }, [editing, existing, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch({ type: "UPDATE_PATIENT", payload: form });
    } else {
      dispatch({ type: "ADD_PATIENT", payload: { ...form, id: uuidv4() } });
    }
    navigate("/patients");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">
        {editing ? "Edit Patient" : "Add Patient"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "dob", "contact", "healthInfo"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-1 rounded">
          {editing ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
