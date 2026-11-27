
import React, { useState } from "react";
import StudentDashboard from "./StudentDashboard.jsx";
import "./StudentLogin.css";

function StudentLogin() {
    const [admission, setAdmission] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!admission.trim() || !password.trim()) {
            alert("Please enter Admission Number and Password");
            return;
        }

        // Demo login only - backend not connected
        setLoggedIn(true);
    };

    if (loggedIn) {
        return <StudentDashboard />;
    }

    return (
        <div className="student-login-page">
            <div className="student-login-card">
                <div className="student-login-logo">
                    <span>RMS</span>
                </div>

                <h1>RMS WORLD SCHOOL</h1>
                <p className="student-portal">STUDENT PORTAL</p>

                <div className="student-login-form">
                    <h2>Welcome Back!</h2>
                    <p>Login to access your student dashboard</p>

                    <form onSubmit={handleLogin}>
                        <label>Admission Number</label>
                        <input
                            type="text"
                            placeholder="Enter Admission Number"
                            value={admission}
                            onChange={(e) => setAdmission(e.target.value)}
                        />

                        <label>Password</label>
                        <div className="student-password">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <div className="student-forgot">
                            Forgot Password?
                        </div>

                        <button
                            type="submit"
                            className="student-login-btn"
                        >
                            LOGIN →
                        </button>
                    </form>
                </div>

                <div className="student-login-footer">
                    © 2026 RMS WORLD SCHOOL. All Rights Reserved.
                </div>
            </div>
        </div>
    );
}

export default StudentLogin;
