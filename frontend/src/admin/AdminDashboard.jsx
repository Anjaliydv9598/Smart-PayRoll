
import React, { useState } from "react";

// Admin Components
import AdminSidebar from "../components/AdminSidebar.jsx";
import AdminNavbar from "../components/AdminNavbar.jsx";


// Admin Pages
import DashboardHome from "../pages/DashboardHome.jsx";
import SchoolPage from "../pages/School.jsx";
import MasterDataNumberSeries from "../pages/MasterDataNumberSeries.jsx";



// Existing Pages
import Employees from "../pages/Employees.jsx";
import Payroll from "../pages/Payroll.jsx";
import Reports from "../pages/Reports.jsx";
import Holidays from "../pages/Holidays.jsx";
import Attendance from "../components/Attendance.jsx";

// CSS
import "./AdminDashboard.css";


const AdminDashboard = () => {

    // Sidebar state
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Active page state
    const [activePage, setActivePage] = useState("Dashboard");


    // Render selected module
    const renderPage = () => {

        switch (activePage) {

            // Dashboard
            case "Dashboard":
                return <DashboardHome />;


            // School Profile
            case "School":
                return <SchoolPage />;


            // Master Data Number Series
            case "Master Data No. Series":
                return <MasterDataNumberSeries />;


            // Employee Management
            case "Employee Data Creation":
                return <Employees />;


            // Staff ID & Password
            case "Staff ID & Password":
                return (
                    <div className="module-placeholder">
                        <h2>Staff ID & Password</h2>
                        <p>This module is ready for implementation.</p>
                    </div>
                );


            // Department
            case "Department":
                return (
                    <div className="module-placeholder">
                        <h2>Department</h2>
                        <p>This module is ready for implementation.</p>
                    </div>
                );


            // Salary
            case "Salary":
                return <Payroll />;


            // Reports
            case "Reports":
                return <Reports />;


            // Attendance
            case "Attendance":
                return <Attendance />;


            // Calendar
            case "Calendar":
                return <Holidays />;


            // Help & Support
            case "Help & Support":
                return (
                    <div className="module-placeholder">
                        <h2>Help & Support</h2>
                        <p>This module is ready for implementation.</p>
                    </div>
                );


            // Downloads
            case "Downloads":
                return (
                    <div className="module-placeholder">
                        <h2>Downloads</h2>
                        <p>This module is ready for implementation.</p>
                    </div>
                );


            // Settings
            case "Settings":
                return (
                    <div className="module-placeholder">
                        <h2>Settings</h2>
                        <p>This module is ready for implementation.</p>
                    </div>
                );


            // Default
            default:
                return <DashboardHome />;
        }
    };


    return (

        <div className="admin-layout">

            {/* Sidebar */}

            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activePage={activePage}
                setActivePage={setActivePage}
            />


            {/* Main Content */}

            <div className="admin-main">

                {/* Navbar */}

                <AdminNavbar
                    setSidebarOpen={setSidebarOpen}
                />


                {/* Selected Page */}

                <main className="admin-content">

                    {renderPage()}

                </main>

            </div>

        </div>
    );
};


export default AdminDashboard;
