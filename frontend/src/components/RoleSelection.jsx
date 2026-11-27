
import React from "react";
import "./RoleSelection.css";

function RoleSelection({ onAdminClick, onStudentClick }) {
    return (
        <div className="role-page">
            <div className="role-content">

                <div className="school-logo">RMS</div>

                <h1>RMS WORLD SCHOOL</h1>
                <p className="role-subtitle">
                    SMART PAYROLL MANAGEMENT SYSTEM
                </p>

                <div className="role-divider"></div>

                <h2>Welcome Back!</h2>
                <p className="role-description">
                    Please select your portal to continue
                </p>

                <div className="role-cards">

                    <div className="role-card" onClick={onAdminClick}>
                        <div className="role-icon">🛡️</div>
                        <h3>Administrator</h3>
                        <p>Manage school operations, employees and payroll.</p>
                        <span className="role-arrow">→</span>
                    </div>


                    <div
                        className="role-card"
                        onClick={onStudentClick}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="role-icon">🎓</div>
                        <h3>Student</h3>
                        <p>
                            Access your profile, attendance and academic details.
                        </p>
                        <span className="role-arrow">→</span>
                    </div>


                    <div className="role-card">
                        <div className="role-icon">👨‍🏫</div>
                        <h3>Staff</h3>
                        <p>Manage your attendance, salary and personal details.</p>
                        <span className="role-arrow">→</span>
                    </div>

                </div>

                <p className="role-footer">
                    © 2026 RMS WORLD SCHOOL. All Rights Reserved.
                </p>

            </div>
        </div>
    );
}

export default RoleSelection;
