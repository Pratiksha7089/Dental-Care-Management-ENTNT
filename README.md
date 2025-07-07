# 🦷 Dental Care Management Dashboard

**🔗 Deployed Application:** [YOUR DEPLOYED APP LINK HERE]  
**📁 GitHub Repository:** [YOUR GITHUB REPOSITORY LINK HERE]

---

## 📌 Project Overview

A web-based dental care dashboard built with React. The app enables **admins** to manage patients, appointments, and incidents, while **patients** can securely log in to view and manage their medical data and appointments.

---

## ✨ Key Features

### 🔐 Authentication
- Role-based login: Admin and Patient.
- Secure page access based on role.

### 👩‍⚕️ Admin View
- Dashboard KPIs (appointments, patients, revenue, etc.)
- Manage patient records (Add/Edit/Delete).
- Schedule and track appointments.
- Upload and manage treatment reports/files.
- Calendar view for appointment tracking.

### 🙋 Patient View
- View and edit profile.
- See upcoming and past appointments.
- Download treatment history as PDF.
- View uploaded files related to treatment.

---

## 🧑‍💻 Technologies Used

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Date Handling:** Moment.js or Date-fns (your implementation)
- **Data Persistence:** Browser LocalStorage
- **PDF Generation:** jsPDF (for profile appointment download)

---

## ⚙️ Setup Instructions (Local Development)

```bash
# 1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd dental-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# Visit http://localhost:5173 in your browser


📁 src
├── 📂 pages           # All main views (Login, Dashboard, Appointments, Patients, etc.)
├── 📂 components      # Reusable UI components (Navbar, ProtectedRoute, etc.)
├── 📂 utils           # seedData.js for initial localStorage setup
├── App.jsx           # Central routing logic
└── main.jsx          # Application root


Technical Decisions
React with Vite: Faster dev environment with optimized build.

Tailwind CSS: Utility-first styling for clean and responsive UI.

LocalStorage: Lightweight and suitable for demo-scale persistence.

ProtectedRoute component: Simple RBAC to secure admin and patient routes.

Modular Design: Each page handles one concern (SRP).

PDF Export: jsPDF used for generating downloadable appointment history.
