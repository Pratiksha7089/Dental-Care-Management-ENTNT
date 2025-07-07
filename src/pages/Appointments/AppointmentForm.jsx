
import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FileUpload from "../../components/FileUpload";

const AppointmentForm = () => {
  const { id } = useParams(); // appointment id
  const { patientId } = useParams();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const existing = state.incidents.find((i) => i.id === id);

  const [form, setForm] = useState(
    existing || {
      id: "",
      patientId: patientId || "",
      title: "",
      description: "",
      comments: "",
      appointmentDate: "",
      cost: "",
      status: "Pending",
      treatment: "",
      nextAppointment: "",
      files: []
    }
  );

  useEffect(() => {
    if (editing && !existing) navigate("/appointments");
  }, [editing, existing, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFiles = (files) => {
    setForm({ ...form, files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch({ type: "UPDATE_INCIDENT", payload: form });
    } else {
      dispatch({ type: "ADD_INCIDENT", payload: { ...form, id: uuidv4() } });
    }
    navigate(patientId ? `/patients/${patientId}/appointments` : "/appointments");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">
        {editing ? "Edit Appointment" : "Add Appointment"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "description", "comments", "appointmentDate", "cost", "treatment", "nextAppointment", "status"].map(
          (field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          )
        )}
        {!patientId && (
          <select
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Patient</option>
            {state.patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        )}

        <FileUpload onFiles={handleFiles} />
        {/* Preview */}
        {form.files.length > 0 && (
          <ul className="list-disc pl-6">
            {form.files.map((f, idx) => (
              <li key={idx}>{f.name}</li>
            ))}
          </ul>
        )}

        <button className="bg-blue-600 text-white px-4 py-1 rounded">
          {editing ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
