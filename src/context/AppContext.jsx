
import React, { createContext, useContext, useReducer } from "react";

/* ----------------------- Initial State from localStorage ------------------ */
const initialState = {
  patients: JSON.parse(localStorage.getItem("patients")) || [],
  incidents: JSON.parse(localStorage.getItem("incidents")) || []
};

/* ------------------------------- Reducer ---------------------------------- */
function reducer(state, action) {
  switch (action.type) {
    /* -------------------------- PATIENT ACTIONS --------------------------- */
    case "ADD_PATIENT": {
      const patients = [...state.patients, action.payload];
      localStorage.setItem("patients", JSON.stringify(patients));
      return { ...state, patients };
    }
    case "UPDATE_PATIENT": {
      const patients = state.patients.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
      localStorage.setItem("patients", JSON.stringify(patients));
      return { ...state, patients };
    }
    case "DELETE_PATIENT": {
      const patients = state.patients.filter((p) => p.id !== action.payload);
      localStorage.setItem("patients", JSON.stringify(patients));
      const incidents = state.incidents.filter((i) => i.patientId !== action.payload);
      localStorage.setItem("incidents", JSON.stringify(incidents));
      return { ...state, patients, incidents };
    }

    /* ------------------------- INCIDENT ACTIONS -------------------------- */
    case "ADD_INCIDENT": {
      const incidents = [...state.incidents, action.payload];
      localStorage.setItem("incidents", JSON.stringify(incidents));
      return { ...state, incidents };
    }
    case "UPDATE_INCIDENT": {
      const incidents = state.incidents.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
      localStorage.setItem("incidents", JSON.stringify(incidents));
      return { ...state, incidents };
    }
    case "DELETE_INCIDENT": {
      const incidents = state.incidents.filter((i) => i.id !== action.payload);
      localStorage.setItem("incidents", JSON.stringify(incidents));
      return { ...state, incidents };
    }

    default:
      return state;
  }
}

/* ------------------------ Context & Provider ------------------------------ */
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
