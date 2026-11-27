
import React from "react";

import {
    LayoutDashboard,
    School,
    GraduationCap,
    Database,
    Users,
    Building2,
    Wallet,
    FileBarChart,
    CalendarCheck,
    UserRoundCog,
    CalendarDays,
    CircleHelp,
    Download,
    Settings,
    LogOut,
    X
} from "lucide-react";

import "./AdminSidebar.css";

const menuGroups = [
    {
        title: "MAIN MENU",
        items: [
            { name: "Dashboard", icon: LayoutDashboard }
        ]
    },
    {
        title: "SCHOOL CONFIGURATION",
        items: [
            { name: "School", icon: School },
            { name: "Master Data No. Series", icon: Database },
            { name: "Department", icon: Building2 }
        ]
    },
    {
        title: "EMPLOYEE MANAGEMENT",
        items: [
            { name: "Employee Data Creation", icon: Users },
            { name: "Staff ID & Password", icon: UserRoundCog }
        ]
    },
    {
        title: "STUDENT MANAGEMENT",
        items: [
            { name: "Student", icon: GraduationCap }
        ]
    },
    {
        title: "HR & PAYROLL",
        items: [
            { name: "Salary", icon: Wallet },
            { name: "Reports", icon: FileBarChart },
            { name: "Attendance", icon: CalendarCheck },
            { name: "Calendar", icon: CalendarDays }
        ]
    },
    {
        title: "RESOURCES",
        items: [
            { name: "Help & Support", icon: CircleHelp },
            { name: "Downloads", icon: Download }
        ]
    }
];

const AdminSidebar = ({
                          sidebarOpen,
                          setSidebarOpen,
                          activePage,
                          setActivePage
                      }) => {

    return (
        <>
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

                <div className="sidebar-brand">

                    <img
                        src="/images/rms-world-school-shield.png"
                        alt="RMS World School Logo"
                        className="rms-school-logo"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />

                    <div className="brand-details">
                        <h2>RMS WORLD SCHOOL</h2>
                        <span>Smart Payroll Management</span>
                    </div>

                    <button
                        className="sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>

                </div>

                <div className="sidebar-menu">

                    {menuGroups.map((group) => (
                        <div className="menu-group" key={group.title}>

                            <p className="menu-heading">
                                {group.title}
                            </p>

                            {group.items.map((item) => {

                                const Icon = item.icon;

                                return (
                                    <button
                                        key={item.name}
                                        className={`sidebar-link ${
                                            activePage === item.name ? "active" : ""
                                        }`}
                                        onClick={() => {
                                            setActivePage(item.name);
                                            setSidebarOpen(false);
                                        }}
                                    >
                                        <Icon size={19} />
                                        <span>{item.name}</span>
                                    </button>
                                );
                            })}

                        </div>
                    ))}

                </div>

                <div className="sidebar-bottom">

                    <button
                        className={`sidebar-link ${activePage === "Settings" ? "active" : ""}`}
                        onClick={() => setActivePage("Settings")}
                    >
                        <Settings size={19} />
                        <span>Settings</span>
                    </button>

                    <button
                        className="sidebar-link logout-link"
                        onClick={() => {
                            window.location.href = "/logout";
                        }}
                    >
                        <LogOut size={19} />
                        <span>Logout</span>
                    </button>

                </div>

            </aside>
        </>
    );
};

export default AdminSidebar;
