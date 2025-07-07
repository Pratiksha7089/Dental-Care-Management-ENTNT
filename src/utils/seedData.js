export const seedLocalStorage = () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem(
      "users",
      JSON.stringify([
        {
          id: "1",
          role: "Admin",
          email: "admin@entnt.in",
          password: "admin1234",
        },
        {
          id: "2",
          role: "Patient",
          email: "john@entnt.in",
          password: "patient123",
          patientId: "p1",
        },
      ])
    );
  }

  if (!localStorage.getItem("patients")) {
    localStorage.setItem(
      "patients",
      JSON.stringify([
        {
          id: "p1",
          name: "John Doe",
          dob: "1990-05-10",
          contact: "1234567890",
          healthInfo: "No allergies",
        },
      ])
    );
  }

  if (!localStorage.getItem("incidents")) {
    localStorage.setItem(
      "incidents",
      JSON.stringify([
        {
          id: "i1",
          patientId: "p1",
          title: "Toothache",
          description: "Upper molar pain",
          comments: "Sensitive to cold",
          appointmentDate: "2025-07-01T10:00:00",
          cost: 80,
          status: "Completed",
          treatment: "Filling",
          nextDate: "2025-07-15T10:00:00",
          files: [],
        },
      ])
    );
  }
};