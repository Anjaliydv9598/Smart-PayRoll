
import React, { useState } from "react";
import "./StudentDashboard.css";

function StudentDashboard() {
    const [activePage, setActivePage] = useState("Dashboard");

    const menuItems = [
        { name: "Dashboard", icon: "🏠" },
        { name: "My Profile", icon: "👤" },
        { name: "Attendance", icon: "📅" },
        { name: "Fee Management", icon: "💰" },
        { name: "Time Table", icon: "📚" },
        { name: "Examination", icon: "🏆" },
        { name: "Leave Application", icon: "📝" },
        { name: "Notifications", icon: "🔔" },
        { name: "Help & Support", icon: "🎧" },
    ];

    return (
        <div className="student-dashboard">

            {/* Sidebar */}
            <aside className="student-sidebar">
                <div className="student-brand">
                    <div className="student-brand-logo">RMS</div>
                    <div>
                        <h3>RMS WORLD SCHOOL</h3>
                        <p>Student Portal</p>
                    </div>
                </div>

                <div className="student-menu-title">MAIN MENU</div>

                <nav className="student-nav">
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            className={`student-nav-item ${
                                activePage === item.name ? "active" : ""
                            }`}
                            onClick={() => setActivePage(item.name)}
                        >
                            <span>{item.icon}</span>
                            {item.name}
                        </div>
                    ))}
                </nav>

                <div className="student-sidebar-bottom">
                    <div
                        className="student-nav-item"
                        onClick={() => window.location.reload()}
                    >
                        <span>🚪</span> Logout
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="student-main">

                <header className="student-topbar">
                    <div>
                        <h2>{activePage}</h2>
                        <p>Welcome back, Student</p>
                    </div>

                    <div className="student-user">
                        <span className="student-notification">🔔</span>
                        <div className="student-avatar">S</div>
                        <div>
                            <strong>Student</strong>
                            <p>Student Portal</p>
                        </div>
                    </div>
                </header>

                <section className="student-content">

                    {activePage === "Dashboard" && (
                        <>
                            <div className="student-welcome">
                                <h1>Welcome back, Student! 👋</h1>
                                <p>Here's your academic overview.</p>
                            </div>

                            <div className="student-stat-grid">
                                <div className="student-stat-card blue">
                                    <span>📚</span>
                                    <p>Total Subjects</p>
                                    <h2>6</h2>
                                    <small>Current academic session</small>
                                </div>

                                <div className="student-stat-card green">
                                    <span>📅</span>
                                    <p>Attendance</p>
                                    <h2>92%</h2>
                                    <small>Overall attendance</small>
                                </div>

                                <div className="student-stat-card yellow">
                                    <span>💰</span>
                                    <p>Fee Status</p>
                                    <h2>Paid</h2>
                                    <small>Current fee status</small>
                                </div>

                                <div className="student-stat-card red">
                                    <span>🏆</span>
                                    <p>Performance</p>
                                    <h2>A+</h2>
                                    <small>Academic performance</small>
                                </div>
                            </div>

                            <div className="student-panel-grid">
                                <div className="student-panel">
                                    <h3>Student Information</h3>
                                    <div className="student-info-row">
                                        <span>Student Name</span>
                                        <strong>Student Name</strong>
                                    </div>
                                    <div className="student-info-row">
                                        <span>Admission Number</span>
                                        <strong>RMS2026001</strong>
                                    </div>
                                    <div className="student-info-row">
                                        <span>Class</span>
                                        <strong>10th</strong>
                                    </div>
                                    <div className="student-info-row">
                                        <span>Academic Session</span>
                                        <strong>2026-2027</strong>
                                    </div>
                                </div>

                                <div className="student-panel">
                                    <h3>Upcoming Activities</h3>
                                    <div className="student-activity">
                                        <span>📘</span>
                                        <div>
                                            <strong>Mathematics Test</strong>
                                            <p>Upcoming examination</p>
                                        </div>
                                    </div>
                                    <div className="student-activity">
                                        <span>🎨</span>
                                        <div>
                                            <strong>School Activity</strong>
                                            <p>School event</p>
                                        </div>
                                    </div>
                                    <div className="student-activity">
                                        <span>📢</span>
                                        <div>
                                            <strong>School Notice</strong>
                                            <p>Check latest announcements</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activePage === "Time Table" && (
                        <div className="student-timetable-page">

                            <div className="timetable-heading">
                                <div>
                                    <h1>Class Time Table</h1>
                                    <p>View your weekly class schedule and subjects.</p>
                                </div>
                                <span className="timetable-session">
                📅 Session 2026-2027
            </span>
                            </div>

                            <div className="timetable-info-grid">
                                <div className="timetable-info-card">
                                    <span>🎓</span>
                                    <div>
                                        <small>Class</small>
                                        <h3>10th - A</h3>
                                    </div>
                                </div>

                                <div className="timetable-info-card">
                                    <span>📚</span>
                                    <div>
                                        <small>Total Subjects</small>
                                        <h3>6 Subjects</h3>
                                    </div>
                                </div>

                                <div className="timetable-info-card">
                                    <span>⏰</span>
                                    <div>
                                        <small>School Timing</small>
                                        <h3>8:00 AM - 2:00 PM</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="timetable-card">
                                <div className="timetable-card-heading">
                                    <h2>📖 Weekly Schedule</h2>
                                    <span>Monday - Saturday</span>
                                </div>

                                <div className="timetable-table-wrapper">
                                    <table className="timetable-table">
                                        <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>8:00 - 9:00</th>
                                            <th>9:00 - 10:00</th>
                                            <th>10:00 - 11:00</th>
                                            <th>11:00 - 11:30</th>
                                            <th>11:30 - 12:30</th>
                                            <th>12:30 - 1:30</th>
                                            <th>1:30 - 2:00</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        <tr>
                                            <td>Monday</td>
                                            <td>English</td>
                                            <td>Mathematics</td>
                                            <td>Science</td>
                                            <td className="break-cell">Break</td>
                                            <td>Hindi</td>
                                            <td>Computer</td>
                                            <td>Games</td>
                                        </tr>

                                        <tr>
                                            <td>Tuesday</td>
                                            <td>Mathematics</td>
                                            <td>English</td>
                                            <td>Social Science</td>
                                            <td className="break-cell">Break</td>
                                            <td>Science</td>
                                            <td>Hindi</td>
                                            <td>Library</td>
                                        </tr>

                                        <tr>
                                            <td>Wednesday</td>
                                            <td>Science</td>
                                            <td>Mathematics</td>
                                            <td>English</td>
                                            <td className="break-cell">Break</td>
                                            <td>Computer</td>
                                            <td>Social Science</td>
                                            <td>Games</td>
                                        </tr>

                                        <tr>
                                            <td>Thursday</td>
                                            <td>Hindi</td>
                                            <td>Science</td>
                                            <td>Mathematics</td>
                                            <td className="break-cell">Break</td>
                                            <td>English</td>
                                            <td>Computer</td>
                                            <td>Library</td>
                                        </tr>

                                        <tr>
                                            <td>Friday</td>
                                            <td>English</td>
                                            <td>Social Science</td>
                                            <td>Science</td>
                                            <td className="break-cell">Break</td>
                                            <td>Mathematics</td>
                                            <td>Hindi</td>
                                            <td>Games</td>
                                        </tr>

                                        <tr>
                                            <td>Saturday</td>
                                            <td>Mathematics</td>
                                            <td>Science</td>
                                            <td>Computer</td>
                                            <td className="break-cell">Break</td>
                                            <td>English</td>
                                            <td>Activity</td>
                                            <td>Library</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="timetable-note">
                                <span>💡</span>
                                <div>
                                    <h3>Important Note</h3>
                                    <p>Please arrive at school before 8:00 AM.
                                        Timetable is subject to change as per school instructions.</p>
                                </div>
                            </div>

                        </div>
                    )}

                    {activePage === "Examination" && (
                        <div className="student-examination-page">

                            <div className="exam-heading">

                                <span className="exam-session">📅 2026-2027</span>
                            </div>

                            {/* Result Summary */}
                            <div className="exam-stats-grid">









                            </div>

                            {/* Upcoming Exams */}
                            <div className="exam-section-card">

                                <div className="exam-section-heading">
                                    <h2>📅 Upcoming Examinations</h2>
                                    <span>Exam Schedule</span>
                                </div>

                                <div className="exam-upcoming-list">

                                    <div className="exam-upcoming-item">
                                        <div className="exam-date-box">
                                            <strong>05</strong>
                                            <span>DEC</span>
                                        </div>
                                        <div className="exam-subject-info">
                                            <h3>Mathematics</h3>
                                            <p>09:00 AM - 12:00 PM</p>
                                        </div>
                                        <span className="exam-upcoming-badge">Upcoming</span>
                                    </div>

                                    <div className="exam-upcoming-item">
                                        <div className="exam-date-box">
                                            <strong>08</strong>
                                            <span>DEC</span>
                                        </div>
                                        <div className="exam-subject-info">
                                            <h3>Science</h3>
                                            <p>09:00 AM - 12:00 PM</p>
                                        </div>
                                        <span className="exam-upcoming-badge">Upcoming</span>
                                    </div>

                                    <div className="exam-upcoming-item">
                                        <div className="exam-date-box">
                                            <strong>10</strong>
                                            <span>DEC</span>
                                        </div>
                                        <div className="exam-subject-info">
                                            <h3>English</h3>
                                            <p>09:00 AM - 12:00 PM</p>
                                        </div>
                                        <span className="exam-upcoming-badge">Upcoming</span>
                                    </div>

                                </div>
                            </div>

                            {/* Subject Results */}


                            {/* Performance */}


                        </div>
                    )}

                    {activePage === "Leave Application" && (
                        <div className="student-leave-page">

                            <div className="leave-heading">
                                <div>
                                    <h1>Leave Application</h1>
                                    <p>Apply for leave and track your application status.</p>
                                </div>
                                <span className="leave-session">📅 Session 2026-2027</span>
                            </div>

                            {/* Leave Summary */}
                            <div className="leave-stats-grid">
                                <div className="leave-stat-card">
                                    <span>📝</span>
                                    <p>Total Applications</p>
                                    <h2>05</h2>
                                </div>

                                <div className="leave-stat-card">
                                    <span>✅</span>
                                    <p>Approved</p>
                                    <h2>03</h2>
                                </div>

                                <div className="leave-stat-card">
                                    <span>⏳</span>
                                    <p>Pending</p>
                                    <h2>01</h2>
                                </div>

                                <div className="leave-stat-card">
                                    <span>❌</span>
                                    <p>Rejected</p>
                                    <h2>01</h2>
                                </div>
                            </div>

                            {/* Leave Form */}
                            <div className="leave-form-card">
                                <div className="leave-form-heading">
                                    <h2>📝 Apply For Leave</h2>
                                    <p>Fill in the details below to submit your leave request.</p>
                                </div>

                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    alert("Leave application submitted successfully!");
                                    e.target.reset();
                                }}>

                                    <div className="leave-form-grid">

                                        <div className="leave-input-group">
                                            <label>Student Name</label>
                                            <input
                                                type="text"
                                                defaultValue="Student Name"
                                                required
                                            />
                                        </div>

                                        <div className="leave-input-group">
                                            <label>Admission Number</label>
                                            <input
                                                type="text"
                                                defaultValue="RMS2026001"
                                                required
                                            />
                                        </div>

                                        <div className="leave-input-group">
                                            <label>Class</label>
                                            <input
                                                type="text"
                                                defaultValue="10th - A"
                                                required
                                            />
                                        </div>

                                        <div className="leave-input-group">
                                            <label>Leave Type</label>
                                            <select required defaultValue="">
                                                <option value="" disabled>Select Leave Type</option>
                                                <option>Medical Leave</option>
                                                <option>Personal Leave</option>
                                                <option>Family Function</option>
                                                <option>Emergency Leave</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div className="leave-input-group">
                                            <label>From Date</label>
                                            <input type="date" required />
                                        </div>

                                        <div className="leave-input-group">
                                            <label>To Date</label>
                                            <input type="date" required />
                                        </div>

                                        <div className="leave-input-group full-width">
                                            <label>Reason For Leave</label>
                                            <textarea
                                                placeholder="Please explain the reason for your leave..."
                                                rows="4"
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="leave-input-group full-width">
                                            <label>Parent / Guardian Contact</label>
                                            <input
                                                type="tel"
                                                placeholder="Enter parent contact number"
                                                required
                                            />
                                        </div>

                                    </div>

                                    <button type="submit" className="leave-submit-btn">
                                        Submit Application →
                                    </button>

                                </form>
                            </div>

                            {/* Application History */}
                            <div className="leave-history-card">

                                <div className="leave-history-heading">
                                    <h2>📋 Leave Application History</h2>
                                    <span>Recent Applications</span>
                                </div>

                                <div className="leave-table-wrapper">
                                    <table className="leave-table">
                                        <thead>
                                        <tr>
                                            <th>Leave Type</th>
                                            <th>From Date</th>
                                            <th>To Date</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        <tr>
                                            <td>Medical Leave</td>
                                            <td>10 Nov 2026</td>
                                            <td>12 Nov 2026</td>
                                            <td>Fever</td>
                                            <td><span className="leave-approved">Approved</span></td>
                                        </tr>

                                        <tr>
                                            <td>Personal Leave</td>
                                            <td>15 Nov 2026</td>
                                            <td>15 Nov 2026</td>
                                            <td>Personal Work</td>
                                            <td><span className="leave-pending">Pending</span></td>
                                        </tr>

                                        <tr>
                                            <td>Family Function</td>
                                            <td>20 Oct 2026</td>
                                            <td>21 Oct 2026</td>
                                            <td>Family Function</td>
                                            <td><span className="leave-rejected">Rejected</span></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        </div>
                    )}




                    {activePage === "Fee Management" && (
                        <div className="student-fee-page">

                            <div className="fee-heading">
                                <div>
                                    <h1>Fee Management</h1>
                                    <p>View your fee details and payment history.</p>
                                </div>
                                <span className="fee-session">Session 2026-2027</span>
                            </div>

                            {/* Fee Summary */}
                            <div className="fee-summary-grid">

                                <div className="fee-summary-card total">
                                    <span>💰</span>
                                    <p>Total Fees</p>
                                    <h2>₹85,000</h2>
                                    <small>Annual fee amount</small>
                                </div>

                                <div className="fee-summary-card paid">
                                    <span>✅</span>
                                    <p>Paid Amount</p>
                                    <h2>₹60,000</h2>
                                    <small>Successfully paid</small>
                                </div>

                                <div className="fee-summary-card pending">
                                    <span>⏳</span>
                                    <p>Pending Amount</p>
                                    <h2>₹25,000</h2>
                                    <small>Remaining fees</small>
                                </div>

                                <div className="fee-summary-card status">
                                    <span>📋</span>
                                    <p>Payment Status</p>
                                    <h2>Partial</h2>
                                    <small>Fees partially paid</small>
                                </div>

                            </div>

                            {/* Fee Progress */}
                            <div className="fee-progress-card">
                                <h3>Fee Payment Progress</h3>

                                <div className="fee-progress-info">
                                    <span>Paid: ₹60,000</span>
                                    <strong>70.6%</strong>
                                </div>

                                <div className="fee-progress-bar">
                                    <div className="fee-progress-fill"></div>
                                </div>

                                <p>You have paid 70.6% of your annual fees.</p>
                            </div>

                            {/* Fee Details */}
                            <div className="fee-table-card">
                                <h3>Fee Details</h3>

                                <div className="fee-table-wrapper">
                                    <table className="fee-table">
                                        <thead>
                                        <tr>
                                            <th>Fee Type</th>
                                            <th>Total Amount</th>
                                            <th>Paid Amount</th>
                                            <th>Pending</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        <tr>
                                            <td>Tuition Fees</td>
                                            <td>₹50,000</td>
                                            <td>₹40,000</td>
                                            <td>₹10,000</td>
                                            <td><span className="fee-badge partial">Partial</span></td>
                                        </tr>

                                        <tr>
                                            <td>Transport Fees</td>
                                            <td>₹15,000</td>
                                            <td>₹10,000</td>
                                            <td>₹5,000</td>
                                            <td><span className="fee-badge partial">Partial</span></td>
                                        </tr>

                                        <tr>
                                            <td>Annual Charges</td>
                                            <td>₹10,000</td>
                                            <td>₹10,000</td>
                                            <td>₹0</td>
                                            <td><span className="fee-badge paid-badge">Paid</span></td>
                                        </tr>

                                        <tr>
                                            <td>Examination Fees</td>
                                            <td>₹10,000</td>
                                            <td>₹0</td>
                                            <td>₹10,000</td>
                                            <td><span className="fee-badge unpaid">Unpaid</span></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Payment History */}
                            <div className="fee-history-card">
                                <h3>Recent Payment History</h3>

                                <div className="fee-history-row">
                                    <div>
                                        <strong>Tuition Fees</strong>
                                        <p>15 November 2026</p>
                                    </div>
                                    <strong>₹20,000</strong>
                                    <span className="fee-badge paid-badge">Success</span>
                                </div>

                                <div className="fee-history-row">
                                    <div>
                                        <strong>Transport Fees</strong>
                                        <p>10 September 2026</p>
                                    </div>
                                    <strong>₹10,000</strong>
                                    <span className="fee-badge paid-badge">Success</span>
                                </div>

                                <div className="fee-history-row">
                                    <div>
                                        <strong>Tuition Fees</strong>
                                        <p>05 July 2026</p>
                                    </div>
                                    <strong>₹30,000</strong>
                                    <span className="fee-badge paid-badge">Success</span>
                                </div>
                            </div>

                        </div>
                    )}




                    {activePage === "My Profile" && (
                        <div className="student-profile-page">

                            <div className="profile-heading">
                                <div>
                                    <h1>My Profile</h1>
                                    <p>View your personal and academic information.</p>
                                </div>
                                <span className="profile-status">Active Student</span>
                            </div>

                            <div className="profile-main-card">

                                <div className="profile-user-section">
                                    <div className="profile-photo">👨‍🎓</div>
                                    <h2>Student Name</h2>
                                    <p>Admission No: RMS2026001</p>
                                    <span>Class 10th - Section A</span>
                                </div>

                                <div className="profile-details">
                                    <h3>Personal Information</h3>

                                    <div className="profile-details-grid">
                                        <div>
                                            <label>Full Name</label>
                                            <strong>Student Name</strong>
                                        </div>
                                        <div>
                                            <label>Admission Number</label>
                                            <strong>RMS2026001</strong>
                                        </div>
                                        <div>
                                            <label>Date of Birth</label>
                                            <strong>01 January 2010</strong>
                                        </div>
                                        <div>
                                            <label>Gender</label>
                                            <strong>Male</strong>
                                        </div>
                                        <div>
                                            <label>Blood Group</label>
                                            <strong>O+</strong>
                                        </div>
                                        <div>
                                            <label>Contact Number</label>
                                            <strong>+91 9876543210</strong>
                                        </div>
                                        <div>
                                            <label>Email Address</label>
                                            <strong>student@gmail.com</strong>
                                        </div>
                                        <div>
                                            <label>Address</label>
                                            <strong>Haryana, India</strong>
                                        </div>
                                    </div>

                                    <h3 className="profile-section-heading">
                                        Parent Information
                                    </h3>

                                    <div className="profile-details-grid">
                                        <div>
                                            <label>Father's Name</label>
                                            <strong>Father Name</strong>
                                        </div>
                                        <div>
                                            <label>Mother's Name</label>
                                            <strong>Mother Name</strong>
                                        </div>
                                        <div>
                                            <label>Parent Contact</label>
                                            <strong>+91 9876543210</strong>
                                        </div>
                                    </div>

                                    <h3 className="profile-section-heading">
                                        Academic Information
                                    </h3>

                                    <div className="profile-details-grid">
                                        <div>
                                            <label>Class</label>
                                            <strong>10th</strong>
                                        </div>
                                        <div>
                                            <label>Section</label>
                                            <strong>A</strong>
                                        </div>
                                        <div>
                                            <label>Roll Number</label>
                                            <strong>25</strong>
                                        </div>
                                        <div>
                                            <label>Academic Session</label>
                                            <strong>2026-2027</strong>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === "Help & Support" && (
                        <div className="student-help-page">

                            <div className="help-heading">
                                <div>
                                    <h1>Help & Support</h1>
                                    <p>We're here to help you with any questions or issues.</p>
                                </div>
                                <span className="help-status">24/7 Support</span>
                            </div>

                            <div className="help-contact-grid">

                                <div className="help-contact-card">
                                    <span>📞</span>
                                    <h3>Call Support</h3>
                                    <p>Talk to our school support team.</p>
                                    <strong>+91 9876543210</strong>
                                </div>

                                <div className="help-contact-card">
                                    <span>✉️</span>
                                    <h3>Email Support</h3>
                                    <p>Send us your questions anytime.</p>
                                    <strong>support@rmsworldschool.com</strong>
                                </div>

                                <div className="help-contact-card">
                                    <span>🏫</span>
                                    <h3>Visit School</h3>
                                    <p>Meet our school administration.</p>
                                    <strong>RMS World School, Haryana</strong>
                                </div>

                            </div>

                            <div className="help-form-card">
                                <h2>Raise a Query</h2>
                                <p>Fill out the form and our team will contact you.</p>

                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    alert("Your query has been submitted successfully!");
                                    e.target.reset();
                                }}>
                                    <div className="help-form-grid">

                                        <div>
                                            <label>Student Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label>Admission Number</label>
                                            <input
                                                type="text"
                                                placeholder="RMS2026001"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label>Query Category</label>
                                            <select required defaultValue="">
                                                <option value="" disabled>Select Category</option>
                                                <option>Attendance Issue</option>
                                                <option>Fee Related</option>
                                                <option>Examination</option>
                                                <option>Time Table</option>
                                                <option>Technical Issue</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label>Contact Number</label>
                                            <input
                                                type="tel"
                                                placeholder="Enter mobile number"
                                                required
                                            />
                                        </div>

                                    </div>

                                    <div className="help-message">
                                        <label>Describe Your Problem</label>
                                        <textarea
                                            placeholder="Write your query here..."
                                            rows="5"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="help-submit-btn">
                                        Submit Query →
                                    </button>
                                </form>
                            </div>

                            <div className="help-faq-card">
                                <h2>Frequently Asked Questions</h2>

                                <details>
                                    <summary>How can I check my attendance?</summary>
                                    <p>Open the Attendance section from your student dashboard.</p>
                                </details>

                                <details>
                                    <summary>How can I check pending fees?</summary>
                                    <p>Visit Fee Management to view your fee details and payment history.</p>
                                </details>

                                <details>
                                    <summary>How can I download my examination details?</summary>
                                    <p>Visit the Examination section for your academic information.</p>
                                </details>

                                <details>
                                    <summary>How can I contact school administration?</summary>
                                    <p>You can contact the school using the contact details above.</p>
                                </details>
                            </div>

                        </div>
                    )}


                    {activePage === "Attendance" && (
                        <div className="attendance-page">

                            <div className="attendance-heading">
                                <div>
                                    <h1>My Attendance</h1>
                                    <p>Track your monthly attendance record.</p>
                                </div>

                                <select>
                                    <option>November 2026</option>
                                    <option>October 2026</option>
                                    <option>September 2026</option>
                                </select>
                            </div>

                            <div className="attendance-stats">

                                <div className="attendance-stat-card">
                                    <span>📅</span>
                                    <p>Total Working Days</p>
                                    <h2>24</h2>
                                </div>

                                <div className="attendance-stat-card present">
                                    <span>✅</span>
                                    <p>Present</p>
                                    <h2>22</h2>
                                </div>

                                <div className="attendance-stat-card absent">
                                    <span>❌</span>
                                    <p>Absent</p>
                                    <h2>01</h2>
                                </div>

                                <div className="attendance-stat-card late">
                                    <span>⏰</span>
                                    <p>Late</p>
                                    <h2>01</h2>
                                </div>

                            </div>

                            <div className="attendance-overview">

                                <h3>Attendance Overview</h3>

                                <div className="attendance-progress-info">
                                    <span>Overall Attendance</span>
                                    <strong>92%</strong>
                                </div>

                                <div className="attendance-progress">
                                    <div style={{ width: "92%" }}></div>
                                </div>

                                <p>Great! Keep maintaining your attendance.</p>

                            </div>

                            <div className="attendance-table-card">

                                <h3>Daily Attendance Record</h3>

                                <table className="attendance-table">
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Day</th>
                                        <th>Check In</th>
                                        <th>Check Out</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td>02 Nov 2026</td>
                                        <td>Monday</td>
                                        <td>08:00 AM</td>
                                        <td>02:00 PM</td>
                                        <td><span className="status-present">Present</span></td>
                                    </tr>

                                    <tr>
                                        <td>03 Nov 2026</td>
                                        <td>Tuesday</td>
                                        <td>08:10 AM</td>
                                        <td>02:00 PM</td>
                                        <td><span className="status-late">Late</span></td>
                                    </tr>

                                    <tr>
                                        <td>04 Nov 2026</td>
                                        <td>Wednesday</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td><span className="status-absent">Absent</span></td>
                                    </tr>

                                    <tr>
                                        <td>05 Nov 2026</td>
                                        <td>Thursday</td>
                                        <td>08:00 AM</td>
                                        <td>02:00 PM</td>
                                        <td><span className="status-present">Present</span></td>
                                    </tr>

                                    <tr>
                                        <td>06 Nov 2026</td>
                                        <td>Friday</td>
                                        <td>07:55 AM</td>
                                        <td>02:00 PM</td>
                                        <td><span className="status-present">Present</span></td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    )}

                    {activePage === "Notifications" && (
                        <div className="student-notification-page">

                            <div className="notification-heading">
                                <div>
                                    <h1>Notifications</h1>
                                    <p>Stay updated with the latest school announcements.</p>
                                </div>
                                <span className="notification-session">🔔 Student Updates</span>
                            </div>

                            {/* Notification Summary */}
                            <div className="notification-stats-grid">

                                <div className="notification-stat-card">
                                    <span>🔔</span>
                                    <p>Total Notifications</p>
                                    <h2>08</h2>
                                </div>

                                <div className="notification-stat-card">
                                    <span>📩</span>
                                    <p>Unread Messages</p>
                                    <h2>03</h2>
                                </div>

                                <div className="notification-stat-card">
                                    <span>✅</span>
                                    <p>Read Messages</p>
                                    <h2>05</h2>
                                </div>

                            </div>

                            {/* Notification List */}
                            <div className="notification-list-card">

                                <div className="notification-list-heading">
                                    <div>
                                        <h2>All Notifications</h2>
                                        <p>Recent updates from your school</p>
                                    </div>
                                    <span className="notification-count">8 Updates</span>
                                </div>

                                <div className="notification-item unread">
                                    <div className="notification-icon blue-icon">📢</div>
                                    <div className="notification-details">
                                        <div className="notification-title-row">
                                            <h3>School Announcement</h3>
                                            <span className="notification-new">NEW</span>
                                        </div>
                                        <p>School will remain closed on Sunday due to the weekly holiday.</p>
                                        <small>📅 27 November 2026</small>
                                    </div>
                                </div>

                                <div className="notification-item unread">
                                    <div className="notification-icon green-icon">💰</div>
                                    <div className="notification-details">
                                        <div className="notification-title-row">
                                            <h3>Fee Payment Reminder</h3>
                                            <span className="notification-new">NEW</span>
                                        </div>
                                        <p>Please clear your pending school fees before the due date.</p>
                                        <small>📅 25 November 2026</small>
                                    </div>
                                </div>

                                <div className="notification-item unread">
                                    <div className="notification-icon orange-icon">📝</div>
                                    <div className="notification-details">
                                        <div className="notification-title-row">
                                            <h3>Examination Notice</h3>
                                            <span className="notification-new">NEW</span>
                                        </div>
                                        <p>Final examination schedule has been announced. Check the Examination section.</p>
                                        <small>📅 24 November 2026</small>
                                    </div>
                                </div>

                                <div className="notification-item">
                                    <div className="notification-icon purple-icon">📅</div>
                                    <div className="notification-details">
                                        <h3>Attendance Update</h3>
                                        <p>Your attendance record has been updated successfully.</p>
                                        <small>📅 22 November 2026</small>
                                    </div>
                                </div>

                                <div className="notification-item">
                                    <div className="notification-icon green-icon">✅</div>
                                    <div className="notification-details">
                                        <h3>Leave Application Approved</h3>
                                        <p>Your leave application has been approved by the school administration.</p>
                                        <small>📅 20 November 2026</small>
                                    </div>
                                </div>

                                <div className="notification-item">
                                    <div className="notification-icon blue-icon">📚</div>
                                    <div className="notification-details">
                                        <h3>Time Table Updated</h3>
                                        <p>Your class timetable has been updated. Please check the latest schedule.</p>
                                        <small>📅 18 November 2026</small>
                                    </div>
                                </div>

                                <div className="notification-item">
                                    <div className="notification-icon orange-icon">🏆</div>
                                    <div className="notification-details">
                                        <h3>Result Published</h3>
                                        <p>Your Term 1 examination results are now available.</p>
                                        <small>📅 15 November 2026</small>
                                    </div>
                                </div>

                                <div className="notification-item">
                                    <div className="notification-icon purple-icon">🎉</div>
                                    <div className="notification-details">
                                        <h3>Annual Function</h3>
                                        <p>Annual school function preparations have started. Stay tuned for updates.</p>
                                        <small>📅 12 November 2026</small>
                                    </div>
                                </div>

                            </div>

                        </div>
                    )}



                    {activePage !== "Dashboard" &&
                        activePage !== "My Profile" &&
                        activePage !== "Attendance" &&
                        activePage !== "Fee Management" &&
                        activePage !== "Time Table" &&
                        activePage !== "Examination" &&
                        activePage !== "Leave Application" &&
                        activePage !== "Help & Support" &&
                        activePage !== "Notifications" &&(
                            <div className="student-panel student-coming">
                                <div>📖</div>
                                <h2>{activePage}</h2>
                                <p>This section is ready for development.</p>
                            </div>
                        )}

                </section>
            </main>
        </div>
    );
}

export default StudentDashboard;
