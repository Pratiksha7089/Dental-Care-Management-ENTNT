import React, { useEffect, useState } from "react";

const PatientProfile = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const found = patients.find((p) => p.id === user.patientId);
    setProfile(found);
  }, []);

  if (!profile) return <div className="p-4">Loading profile...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>DOB:</strong> {profile.dob}</p>
      <p><strong>Contact:</strong> {profile.contact}</p>
      <p><strong>Health Info:</strong> {profile.healthInfo}</p>
    </div>
  );
};

export default PatientProfile;
