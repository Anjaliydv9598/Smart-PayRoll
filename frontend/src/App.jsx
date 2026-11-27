
import React, { useState } from "react";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import RoleSelection from "./components/RoleSelection.jsx";
import StudentLogin from "./components/StudentLogin.jsx";
import "./App.css";

function App() {
    const [activePage, setActivePage] = useState("home");

    return (
        <div className="app">
            {activePage === "home" && (
                <RoleSelection
                    onAdminClick={() => setActivePage("admin")}
                    onStudentClick={() => setActivePage("student")}
                />
            )}

            {activePage === "admin" && <AdminDashboard />}

            {activePage === "student" && <StudentLogin />}
        </div>
    );
}

export default App;
