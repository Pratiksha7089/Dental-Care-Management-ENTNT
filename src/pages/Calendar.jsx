import React, { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("incidents")) || [];
    setAppointments(all);
  }, []);

  const getAppointmentsForDate = (date) => {
    return appointments.filter(
      (appt) =>
        moment(appt.appointmentDate).format("YYYY-MM-DD") ===
        moment(date).format("YYYY-MM-DD")
    );
  };

  const getDaysInMonth = (date) => {
    const start = moment(date).startOf("month");
    const end = moment(date).endOf("month");
    const days = [];
    for (let day = start.clone(); day.isBefore(end) || day.isSame(end); day.add(1, "day")) {
      days.push(day.clone());
    }
    return days;
  };

  const renderAppointments = (day) => {
    const appts = getAppointmentsForDate(day);
    if (!appts.length) return null;
    return appts.map((a) => (
      <div
        key={a.id}
        className={`text-sm my-1 px-2 py-1 rounded shadow border-l-4 ${
          a.status === "Completed"
            ? "bg-green-100 border-green-500"
            : a.status === "Pending"
            ? "bg-yellow-100 border-yellow-500"
            : "bg-red-100 border-red-500"
        }`}
      >
        <strong>{a.title}</strong> <br />
        <span className="text-xs text-gray-600">
          {moment(a.appointmentDate).format("hh:mm A")}
        </span>
      </div>
    ));
  };

  const renderDayView = () => {
    const appts = getAppointmentsForDate(selectedDate);
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          Appointments on {moment(selectedDate).format("YYYY-MM-DD")}
        </h2>
        {appts.length === 0 ? (
          <p>No appointments</p>
        ) : (
          <ul className="space-y-2">
            {appts.map((a) => (
              <li key={a.id} className="border p-2 rounded">
                <strong>{a.title}</strong>
                <br />
                <span className="text-sm">{a.description}</span>
                <br />
                <span className="text-xs text-gray-600">
                  Time: {moment(a.appointmentDate).format("hh:mm A")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="month">Monthly</option>
          <option value="day">Daily</option>
        </select>
      </div>

      {view === "day" ? (
        <>
          <div className="mb-4">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="border p-2 rounded"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          {renderDayView()}
        </>
      ) : (
        <div className="grid grid-cols-7 gap-4">
          {getDaysInMonth(selectedDate).map((day) => (
            <div key={day} className="border p-2 min-h-[100px]">
              <div className="text-sm font-bold">{day.format("DD MMM")}</div>
              {renderAppointments(day)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
