import React, { useEffect, useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ date: "", status: "", patientId: "" });

  const blankForm = {
    id: null,
    patientId: "",
    title: "",
    description: "",
    comments: "",
    appointmentDate: "",
    cost: "",
    treatment: "",
    status: "Pending",
    nextAppointmentDate: "",
    files: [],
  };
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("incidents")) || [];
    setAppointments(stored);
    setFiltered(stored);
  }, []);

  useEffect(() => {
    let result = [...appointments];
    if (filters.date) {
      result = result.filter((a) => a.appointmentDate?.split("T")[0] === filters.date);
    }
    if (filters.status) {
      result = result.filter((a) => a.status === filters.status);
    }
    if (filters.patientId) {
      result = result.filter((a) =>
        a.patientId?.toLowerCase().includes(filters.patientId.toLowerCase())
      );
    }
    setFiltered(result);
  }, [filters, appointments]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "files") {
      setForm((prev) => ({ ...prev, files: Array.from(files) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...appointments];

    const appointment = {
      ...form,
      id: form.id || Date.now(),
      cost: Number(form.cost) || 0,
    };

    if (form.id) {
      const index = updated.findIndex((a) => a.id === form.id);
      updated[index] = appointment;
    } else {
      updated.push(appointment);
    }

    localStorage.setItem("incidents", JSON.stringify(updated));
    setAppointments(updated);
    setForm(blankForm);
  };

  const handleEdit = (appt) => {
    setForm({ ...appt });
  };

  const displayDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) : "—";
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>

      {/* Filter Section */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-3 bg-gray-100 p-4 mb-6 rounded shadow">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}
          className="border p-2 rounded"
        />
        <select
          name="status"
          value={filters.status}
          onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          type="text"
          name="patientId"
          placeholder="Search by Patient ID"
          value={filters.patientId}
          onChange={(e) => setFilters((prev) => ({ ...prev, patientId: e.target.value }))}
          className="border p-2 rounded"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 grid-cols-1 md:grid-cols-2 bg-white p-4 shadow rounded mb-6"
      >
        <input
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          placeholder="Patient ID"
          className="border p-2 rounded"
          required
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
        />
        <input
          name="comments"
          value={form.comments}
          onChange={handleChange}
          placeholder="Comments"
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="cost"
          type="number"
          value={form.cost}
          onChange={handleChange}
          placeholder="Cost (₹)"
          className="border p-2 rounded"
        />
        <input
          name="treatment"
          value={form.treatment}
          onChange={handleChange}
          placeholder="Treatment"
          className="border p-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          type="datetime-local"
          name="nextAppointmentDate"
          value={form.nextAppointmentDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="file"
          name="files"
          multiple
          onChange={handleChange}
          className="border p-2 rounded col-span-1 md:col-span-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 col-span-1 md:col-span-2"
        >
          {form.id ? "Update Appointment" : "Add Appointment"}
        </button>
      </form>

      {/* List Section */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-2">Appointments List</h3>
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Patient ID</th>
              <th className="p-2 border">Appointment Date</th>
              <th className="p-2 border">Next Appointment</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Cost (₹)</th>
              <th className="p-2 border">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-2 border">{a.title}</td>
                  <td className="p-2 border">{a.patientId}</td>
                  <td className="p-2 border">{displayDate(a.appointmentDate)}</td>
                  <td className="p-2 border">{displayDate(a.nextAppointmentDate)}</td>
                  <td className="p-2 border">{a.status}</td>
                  <td className="p-2 border">₹{a.cost || 0}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleEdit(a)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No matching appointments.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
