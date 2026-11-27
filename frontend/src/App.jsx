
import React, { useState } from "react";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import RoleSelection from "./components/RoleSelection.jsx";
import StudentLogin from "./components/StudentLogin.jsx";
import EmployeeManagement from "./pages/EmployeeManagement.jsx";
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

            {activePage === "admin" && (
                <AdminDashboard
                    onEmployeeManagementClick={() =>
                        setActivePage("employees")
                    }
                />
            )}

            {activePage === "employees" && (
                <EmployeeManagement
                    onBack={() => setActivePage("admin")}
                />
            )}

            {activePage === "student" && <StudentLogin />}
        </div>
    );
}

export default App;
