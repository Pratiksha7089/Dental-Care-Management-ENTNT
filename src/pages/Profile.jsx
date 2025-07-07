import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));
  const [patients, setPatients] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const allPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const currentPatient = allPatients.find(p => p.id === user.patientId);
    setPatients([currentPatient]);
    setFormData(currentPatient);
    const allIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    const patientIncidents = allIncidents.filter(i => i.patientId === user.patientId);
    setAppointments(patientIncidents);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const idx = updatedPatients.findIndex(p => p.id === formData.id);
    updatedPatients[idx] = formData;
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    setEditMode(false);
    setPatients([formData]);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Appointment History for ${formData.name}`, 10, 10);
    let y = 20;
    appointments.forEach((a, i) => {
      doc.text(`• ${a.title} (${a.appointmentDate?.slice(0, 10)}): ${a.status}, ₹${a.cost}`, 10, y);
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });
    doc.save("appointment-history.pdf");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {editMode ? (
        <div className="space-y-2">
          <input name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
          <input name="dob" value={formData.dob} onChange={handleChange} className="border p-2 w-full" />
          <input name="contact" value={formData.contact} onChange={handleChange} className="border p-2 w-full" />
          <textarea name="healthInfo" value={formData.healthInfo} onChange={handleChange} className="border p-2 w-full" />
          <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
        </div>
      ) : (
        <div className="space-y-2">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>DOB:</strong> {formData.dob}</p>
          <p><strong>Contact:</strong> {formData.contact}</p>
          <p><strong>Health Info:</strong> {formData.healthInfo}</p>
          <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">My Appointments</h3>
        <button onClick={downloadPDF} className="bg-indigo-600 text-white px-3 py-1 rounded mb-2">Download PDF</button>
        {appointments.length ? (
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th>Title</th><th>Date</th><th>Cost</th><th>Status</th><th>Files</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-t">
                  <td>{a.title}</td>
                  <td>{a.appointmentDate?.slice(0,10)}</td>
                  <td>₹{a.cost}</td>
                  <td>{a.status}</td>
                  <td>{a.files?.length ? a.files.map((f, i) => <span key={i}>{f.name}</span>) : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
