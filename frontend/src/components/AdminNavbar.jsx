
import React, { useState } from "react";
import {
    Menu,
    Bell,
    ChevronDown,
    UserRound,
    School,
    Lock,
    LogOut
} from "lucide-react";

import "./AdminNavbar.css";

const AdminNavbar = ({ setSidebarOpen }) => {

    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <header className="admin-navbar">

            <div className="navbar-left">

                <button
                    className="menu-toggle"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu size={23} />
                </button>

                <div>
                    <h3>Admin Dashboard</h3>
                    <p>Welcome back, Administrator</p>
                </div>

            </div>

            <div className="navbar-right">

                <button className="notification-btn">
                    <Bell size={21} />
                    <span className="notification-dot"></span>
                </button>

                <div className="profile-container">

                    <button
                        className="profile-button"
                        onClick={() => setProfileOpen(!profileOpen)}
                    >
                        <div className="profile-avatar">A</div>

                        <div className="profile-info">
                            <strong>Administrator</strong>
                            <span>School Admin</span>
                        </div>

                        <ChevronDown size={17} />
                    </button>

                    {profileOpen && (
                        <div className="profile-dropdown">

                            <a href="/admin/profile">
                                <UserRound size={17} />
                                My Profile
                            </a>

                            <a href="/admin/school">
                                <School size={17} />
                                About School
                            </a>

                            <a href="/admin/change-password">
                                <Lock size={17} />
                                Change Password
                            </a>

                            <a href="/logout" className="dropdown-logout">
                                <LogOut size={17} />
                                Logout
                            </a>

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
};

export default AdminNavbar;
