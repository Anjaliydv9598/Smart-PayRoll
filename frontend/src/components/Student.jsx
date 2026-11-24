
import React, { useState } from "react";


function Student() {
    const [page, setPage] = useState("register");
    const [registeredStudent, setRegisteredStudent] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        admissionNumber: "",
        className: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });

    const [loginData, setLoginData] = useState({
        admissionNumber: "",
        password: ""
    });

    const studentModules = [
        {
            title: "Fees Management",
            icon: "💰",
            description: "Manage student fees, payments and pending dues."
        },
        {
            title: "Student ID & Password",
            icon: "🔐",
            description: "View student login ID and account details."
        },
        {
            title: "Calendar",
            icon: "📅",
            description: "View school events, holidays and schedules."
        },
        {
            title: "Help & Support",
            icon: "🎧",
            description: "Get help and submit student queries."
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Student Registration
    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        // Frontend demo only - backend verification is pending
        setRegisteredStudent({ ...formData });

        setLoginData({
            admissionNumber: formData.admissionNumber,
            password: ""
        });

        setMessage("Registration successful! Please login.");

        setPage("login");
    };

    // Student Login
    const handleLogin = (e) => {
        e.preventDefault();

        if (!registeredStudent) {
            setMessage("Please register your account first.");
            return;
        }

        if (
            loginData.admissionNumber.trim() !==
            registeredStudent.admissionNumber.trim() ||
            loginData.password !== registeredStudent.password
        ) {
            setMessage("Invalid Admission Number or Password!");
            return;
        }

        setMessage("");
        setPage("dashboard");
    };

    const handleLogout = () => {
        setLoginData({
            admissionNumber: "",
            password: ""
        });
        setSelectedModule(null);
        setMessage("");
        setPage("login");
    };

    return (
        <>
            <style>{`
                .student-container {
                    min-height: 85vh;
                    padding: 30px;
                    background: #f5f6fc;
                    font-family: Arial, sans-serif;
                }

                .student-auth-card {
                    max-width: 650px;
                    margin: 20px auto;
                    padding: 35px;
                    background: white;
                    border-radius: 18px;
                    box-shadow: 0 8px 30px rgba(0,0,0,.07);
                }

                .student-auth-heading {
                    text-align: center;
                    margin-bottom: 25px;
                }

                .student-auth-heading .icon {
                    font-size: 45px;
                }

                .student-auth-heading h1 {
                    color: #17213c;
                    margin: 10px 0;
                }

                .student-auth-heading p {
                    color: #8993ac;
                }

                .student-form {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .student-field {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }

                .student-field.full {
                    grid-column: 1 / -1;
                }

                .student-field label {
                    color: #334155;
                    font-size: 13px;
                    font-weight: 600;
                }

                .student-field input {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 13px;
                    border: 1px solid #dbe2ea;
                    border-radius: 8px;
                    outline: none;
                    font-size: 14px;
                }

                .student-field input:focus {
                    border-color: #5146d8;
                    box-shadow: 0 0 0 3px rgba(81,70,216,.1);
                }

                .student-submit {
                    width: 100%;
                    padding: 14px;
                    background: #5146d8;
                    border: none;
                    border-radius: 8px;
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                }

                .student-submit:hover {
                    background: #3f35bd;
                }

                .student-switch {
                    text-align: center;
                    margin-top: 22px;
                    color: #8993ac;
                }

                .student-switch button {
                    border: none;
                    background: none;
                    color: #5146d8;
                    font-weight: bold;
                    cursor: pointer;
                    margin-left: 5px;
                }

                .student-message {
                    text-align: center;
                    color: #dc2626;
                    font-size: 14px;
                    margin-top: 15px;
                }

                .student-message.success {
                    color: #15803d;
                }

                .student-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }

                .student-header h1 {
                    font-size: 28px;
                    color: #17213c;
                    margin-bottom: 8px;
                }

                .student-header p {
                    color: #8993ac;
                }

                .student-icon {
                    font-size: 35px;
                    background: #eeedff;
                    padding: 15px;
                    border-radius: 16px;
                }

                .student-welcome {
                    background: white;
                    padding: 28px;
                    border-radius: 16px;
                    margin-bottom: 25px;
                    border: 1px solid #e8eaf2;
                }

                .student-welcome h2 {
                    color: #5146d8;
                    margin-top: 0;
                }

                .student-welcome p {
                    color: #8993ac;
                }

                .student-section-title {
                    color: #17213c;
                    margin-bottom: 18px;
                }

                .student-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                }

                .student-card {
                    background: white;
                    padding: 25px;
                    border-radius: 16px;
                    border: 1px solid #e8eaf2;
                    transition: .3s;
                    cursor: pointer;
                }

                .student-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0,0,0,.06);
                    border-color: #c9c5ff;
                }

                .student-card-icon {
                    font-size: 28px;
                    margin-bottom: 15px;
                }

                .student-card h3 {
                    color: #17213c;
                }

                .student-card p {
                    color: #8993ac;
                    font-size: 14px;
                    line-height: 1.6;
                }

                .student-card strong {
                    color: #5146d8;
                    font-size: 13px;
                }

                .student-logout {
                    border: none;
                    background: #fee2e2;
                    color: #b91c1c;
                    padding: 10px 18px;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .student-back {
                    border: none;
                    background: #eeedff;
                    color: #5146d8;
                    padding: 11px 18px;
                    border-radius: 8px;
                    cursor: pointer;
                    margin-bottom: 20px;
                    font-weight: 600;
                }

                @media(max-width: 650px) {
                    .student-form,
                    .student-grid {
                        grid-template-columns: 1fr;
                    }

                    .student-field.full {
                        grid-column: auto;
                    }

                    .student-auth-card {
                        padding: 22px;
                    }

                    .student-container {
                        padding: 18px;
                    }

                    .student-header h1 {
                        font-size: 22px;
                    }
                }
            `}</style>

            <div className="student-container">

                {/* REGISTRATION PAGE */}
                {page === "register" && (
                    <div className="student-auth-card">

                        <div className="student-auth-heading">
                            <div className="icon">🎓</div>
                            <h1>Student Registration</h1>
                            <p>Create your school student account</p>
                        </div>

                        <form
                            className="student-form"
                            onSubmit={handleRegister}
                        >
                            <div className="student-field full">
                                <label>Student Full Name</label>
                                <input
                                    name="fullName"
                                    placeholder="Enter full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div className="student-field">
                                <label>Admission Number (Admin Provided)</label>
                                <input
                                    name="admissionNumber"
                                    placeholder="Enter admission number"
                                    value={formData.admissionNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="student-field">
                                <label>Class</label>
                                <input
                                    name="className"
                                    placeholder="Enter class"
                                    value={formData.className}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="student-field">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="student-field">
                                <label>Mobile Number</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Enter 10 digit mobile number"
                                    value={formData.mobile}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        if (value.length <= 10) {
                                            setFormData({
                                                ...formData,
                                                mobile: value
                                            });
                                        }
                                    }}
                                    maxLength={10}
                                    minLength={10}
                                    pattern="[0-9]{10}"
                                    title="Please enter exactly 10 digits"
                                    required
                                />
                            </div>

                            <div className="student-field">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>

                            <div className="student-field">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>

                            <div className="student-field full">
                                <button
                                    className="student-submit"
                                    type="submit"
                                >
                                    Create Student Account
                                </button>
                            </div>
                        </form>

                        {message && (
                            <p className={`student-message ${
                                message.includes("successful") ? "success" : ""
                            }`}>
                                {message}
                            </p>
                        )}

                        <div className="student-switch">
                            Already registered?
                            <button onClick={() => {
                                setMessage("");
                                setPage("login");
                            }}>
                                Login Here
                            </button>
                        </div>
                    </div>
                )}

                {/* LOGIN PAGE */}
                {page === "login" && (
                    <div className="student-auth-card">

                        <div className="student-auth-heading">
                            <div className="icon">🔐</div>
                            <h1>Student Login</h1>
                            <p>Login to your student account</p>
                        </div>

                        <form
                            className="student-form"
                            onSubmit={handleLogin}
                        >
                            <div className="student-field full">
                                <label>Admission Number</label>
                                <input
                                    value={loginData.admissionNumber}
                                    onChange={(e) => setLoginData({
                                        ...loginData,
                                        admissionNumber: e.target.value
                                    })}
                                    placeholder="Enter admission number"
                                    required
                                />
                            </div>

                            <div className="student-field full">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({
                                        ...loginData,
                                        password: e.target.value
                                    })}
                                    placeholder="Enter password"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            <div className="student-field full">
                                <button
                                    className="student-submit"
                                    type="submit"
                                >
                                    Login to Student Account
                                </button>
                            </div>
                        </form>

                        {message && (
                            <p className="student-message">{message}</p>
                        )}

                        <div className="student-switch">
                            New Student?
                            <button onClick={() => {
                                setMessage("");
                                setPage("register");
                            }}>
                                Register Here
                            </button>
                        </div>
                    </div>
                )}

                {/* STUDENT DASHBOARD */}
                {page === "dashboard" && (
                    <>
                        <div className="student-header">
                            <div>
                                <h1>My Student Space 🎓</h1>
                                <p>
                                    Hello, {registeredStudent?.fullName}! 👋
                                    Welcome back to your school portal.
                                </p>
                            </div>

                            <div className="student-header-actions">
                                <button
                                    className="student-edit-btn"
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            fullName: registeredStudent.fullName,
                                            className: registeredStudent.className,
                                            email: registeredStudent.email,
                                            mobile: registeredStudent.mobile
                                        });
                                        setIsEditing(true);
                                    }}
                                >
                                    ✏️ Edit Profile
                                </button>

                                <button
                                    className="student-logout"
                                    onClick={handleLogout}
                                >
                                    🔒 Logout
                                </button>
                            </div>
                        </div>
                        {isEditing && (
                            <div className="student-welcome">
                                <h2>✏️ Edit Student Profile</h2>

                                <form
                                    className="student-form"
                                    onSubmit={(e) => {
                                        e.preventDefault();

                                        setRegisteredStudent({
                                            ...registeredStudent,
                                            fullName: formData.fullName,
                                            className: formData.className,
                                            email: formData.email,
                                            mobile: formData.mobile
                                        });

                                        setIsEditing(false);
                                    }}
                                >
                                    <div className="student-field">
                                        <label>Full Name</label>
                                        <input
                                            value={formData.fullName}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    fullName: e.target.value
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="student-field">
                                        <label>Class</label>
                                        <input
                                            value={formData.className}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    className: e.target.value
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="student-field">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="student-field">
                                        <label>Mobile Number</label>
                                        <input
                                            type="tel"
                                            value={formData.mobile}
                                            maxLength={10}
                                            minLength={10}
                                            pattern="[0-9]{10}"
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, "");
                                                setFormData({
                                                    ...formData,
                                                    mobile: value
                                                });
                                            }}
                                            required
                                        />
                                    </div>

                                    <div className="student-field full">
                                        <button className="student-submit" type="submit">
                                            Save Changes
                                        </button>

                                        <button
                                            type="button"
                                            className="student-back"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="student-welcome">
                            <h2>
                                Welcome, {registeredStudent?.fullName}! 🎓
                            </h2>
                            <p>
                                Admission Number: {registeredStudent?.admissionNumber}
                            </p>
                            <p>
                                Class: {registeredStudent?.className}
                            </p>
                            <p>
                                <strong>Contact Number:</strong>{" "}
                                {registeredStudent?.mobile}
                            </p>
                        </div>

                        <h3 className="student-section-title">
                            Student Services
                        </h3>

                        <div className="student-grid">
                            {studentModules.map((item) => (
                                <div
                                    className="student-card"
                                    key={item.title}
                                    onClick={() => {
                                        setSelectedModule(item);
                                        setPage("module");
                                    }}
                                >
                                    <div className="student-card-icon">
                                        {item.icon}
                                    </div>

                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <strong>View Details →</strong>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* INDIVIDUAL STUDENT SERVICE PAGE */}
                {page === "module" && selectedModule && (
                    <>
                        <button
                            className="student-back"
                            onClick={() => setPage("dashboard")}
                        >
                            ← Back to Dashboard
                        </button>

                        <div className="student-welcome">
                            <div style={{ fontSize: "40px" }}>
                                {selectedModule.icon}
                            </div>

                            <h2>{selectedModule.title}</h2>
                            <p>{selectedModule.description}</p>
                        </div>
                    </>
                )}

            </div>
        </>
    );
}

export default Student;
