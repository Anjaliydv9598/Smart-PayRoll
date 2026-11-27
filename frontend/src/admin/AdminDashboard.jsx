
import React, { useState } from "react";

// Admin Components
import AdminSidebar from "../components/AdminSidebar.jsx";
import AdminNavbar from "../components/AdminNavbar.jsx";
import AdminStudents from "../components/AdminStudents.jsx";

// Admin Pages
import DashboardHome from "../pages/DashboardHome.jsx";
import SchoolPage from "../pages/School.jsx";
import MasterDataNumberSeries from "../pages/MasterDataNumberSeries.jsx";
import Department from "../pages/Department.jsx";

// Existing Pages
import Employees from "../pages/Employees.jsx";
import Payroll from "../pages/Payroll.jsx";
import Reports from "../pages/Reports.jsx";
import Holidays from "../pages/Holidays.jsx";
import Attendance from "../components/Attendance.jsx";

// CSS
import "./AdminDashboard.css";

const AdminDashboard = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState("Dashboard");

    // Stores the Number Series selected from Department page
    const [selectedSeriesId, setSelectedSeriesId] = useState(null);

    const renderPage = () => {

        switch (activePage) {

            case "Dashboard":
                return <DashboardHome />;

            case "School":
                return <SchoolPage />;

            case "Master Data No. Series":
                return (
                    <MasterDataNumberSeries
                        initialEditId={selectedSeriesId}
                        onEditComplete={() => setSelectedSeriesId(null)}
                    />
                );

            case "Employee Data Creation":
                return <Employees />;

            case "Staff ID & Password":
                return (
                    <div className="module-placeholder">
                        <h2>Staff ID & Password</h2>
                        <p>This module is ready for implementation.</p>
                    </div>
                );

            case "Department":
                return (
                    <Department
                        onEditSeries={(id) => {
                            setSelectedSeriesId(id);
                            setActivePage("Master Data No. Series");
                        }}
                    />
                );

            case "Salary":
                return <Payroll />;

            case "Reports":
                return <Reports />;

            case "Attendance":
                return <Attendance />;

            case "Calendar":
                return <Holidays />;

            case "Student":
                return <AdminStudents />;

            case "Help & Support":
                return (
                    <div className="module-placeholder">
                        <h2>Help & Support</h2>
                        <p>This module is ready for implementation.</p>
                    </div>
                );

            case "Downloads":
                return (
                    <div className="module-placeholder">
                        <h2>Downloads</h2>
                        <p>This module is ready for implementation.</p>
                    </div>
                );

            case "Settings":
                return (
                    <div className="module-placeholder">
                        <h2>Settings</h2>
                        <p>This module is ready for implementation.</p>
                    </div>
                );

            default:
                return <DashboardHome />;
        }
    };

    return (
        <div className="admin-layout">

            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <div className="admin-main">

                <AdminNavbar
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="admin-content">
                    {renderPage()}
                </main>

            </div>
        </div>
    );
};

export default AdminDashboard;
