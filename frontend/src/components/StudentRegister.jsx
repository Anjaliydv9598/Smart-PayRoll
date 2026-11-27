
import { useState } from "react";

function StudentRegister({ onLogin }) {
    const [formData, setFormData] = useState({
        fullName: "",
        admissionNumber: "",
        className: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        setMessage("Registration form submitted successfully!");

        // Backend API integration next step
        console.log(formData);
    };

    return (
        <div className="student-register-page">
            <style>{`
                .student-register-page {
                    min-height: 85vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 30px 15px;
                    background: #f4f7fc;
                }

                .register-card {
                    width: 100%;
                    max-width: 650px;
                    background: white;
                    padding: 35px;
                    border-radius: 18px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
                }

                .register-heading {
                    text-align: center;
                    margin-bottom: 25px;
                }

                .register-heading h2 {
                    color: #172554;
                    margin-bottom: 8px;
                }

                .register-heading p {
                    color: #64748b;
                    font-size: 14px;
                }

                .register-form {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 18px;
                }

                .register-field {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }

                .register-field label {
                    font-size: 13px;
                    font-weight: 600;
                    color: #334155;
                }

                .register-field input {
                    padding: 12px;
                    border: 1px solid #dbe2ea;
                    border-radius: 8px;
                    outline: none;
                    font-size: 14px;
                }

                .register-field input:focus {
                    border-color: #2563eb;
                }

                .register-full {
                    grid-column: 1 / -1;
                }

                .register-btn {
                    width: 100%;
                    padding: 13px;
                    border: none;
                    border-radius: 8px;
                    background: #2563eb;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                }

                .register-btn:hover {
                    background: #1d4ed8;
                }

                .register-message {
                    text-align: center;
                    color: #dc2626;
                    margin-top: 15px;
                    font-size: 14px;
                }

                .register-login {
                    text-align: center;
                    margin-top: 20px;
                    color: #64748b;
                    font-size: 14px;
                }

                .register-login button {
                    border: none;
                    background: none;
                    color: #2563eb;
                    font-weight: 600;
                    cursor: pointer;
                }

                @media(max-width: 600px) {
                    .register-form {
                        grid-template-columns: 1fr;
                    }

                    .register-full {
                        grid-column: auto;
                    }

                    .register-card {
                        padding: 22px;
                    }
                }
            `}</style>

            <div className="register-card">
                <div className="register-heading">
                    <div style={{ fontSize: "40px" }}>🎓</div>
                    <h2>Student Registration</h2>
                    <p>Create your school student account</p>
                </div>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="register-field register-full">
                        <label>Student Full Name</label>
                        <input
                            name="fullName"
                            placeholder="Enter full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Admission Number (Admin Provided)</label>
                        <input
                            name="admissionNumber"
                            placeholder="Enter admission number"
                            value={formData.admissionNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Class</label>
                        <input
                            name="className"
                            placeholder="e.g. Class 10"
                            value={formData.className}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Enter mobile number"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-full">
                        <button className="register-btn" type="submit">
                            Create Student Account
                        </button>
                    </div>
                </form>

                {message && (
                    <p className="register-message">{message}</p>
                )}

                <div className="register-login">
                    Already have an account?
                    <button type="button" onClick={onLogin}>
                        Login Here
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StudentRegister;
