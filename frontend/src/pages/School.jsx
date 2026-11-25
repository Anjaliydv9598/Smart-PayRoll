
import React, { useState } from "react";
import {
    School as SchoolIcon,
    Building2,
    CalendarDays,
    Users,
    Wallet,
    Clock,
    FileText,
    Save,
    MapPin,
    Mail,
    Phone,
    GraduationCap,
    CheckCircle
} from "lucide-react";

import "./School.css";

const School = () => {

    const [activeTab, setActiveTab] = useState("Basic Information");
    const [saved, setSaved] = useState(false);

    const [schoolData, setSchoolData] = useState({
        schoolName: "RMS World School",
        address: "11th Milestone, Rewari-Shanjahapur Road, Sulkha",
        city: "Rewari",
        state: "Haryana",
        pincode: "",
        phone: "",
        email: "",
        website: "",
        schoolType: "Private School",
        affiliationNumber: "",
        registrationNumber: "",

        academicSession: "2026-2027",
        sessionStart: "",
        sessionEnd: "",
        workingDays: "Monday to Saturday",
        weeklyHoliday: "Sunday",
        schoolStartTime: "08:00",
        schoolEndTime: "14:00",

        principalName: "",
        principalPhone: "",
        principalEmail: "",
        adminName: "Administrator",
        managementName: "School Administration",

        salaryPaymentDate: "5",
        salaryCalculation: "Monthly",
        monthlyWorkingDays: "30",
        pfApplicable: "No",
        taxApplicable: "No",

        reportingTime: "08:00",
        lateAfter: "08:15",
        halfDayAfter: "12:00",
        attendanceMethod: "Punch In / Punch Out",
        correctionApproval: "Admin Approval Required",

        registrationDocument: "",
        affiliationDocument: "",
        otherDocuments: ""
    });

    const updateField = (e) => {
        const { name, value } = e.target;

        setSchoolData(prev => ({
            ...prev,
            [name]: value
        }));

        setSaved(false);
    };

    const handleSave = (e) => {
        e.preventDefault();

        // Frontend demonstration only.
        // Backend API integration will be added separately.
        setSaved(true);
    };

    const tabs = [
        { name: "Basic Information", icon: SchoolIcon },
        { name: "Academic Information", icon: CalendarDays },
        { name: "Administration", icon: Users },
        { name: "Payroll Configuration", icon: Wallet },
        { name: "Attendance Policies", icon: Clock },
        { name: "Documents", icon: FileText }
    ];

    const renderInput = (label, name, type = "text", placeholder = "") => (
        <div className="school-field" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={schoolData[name]}
                onChange={updateField}
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            />
        </div>
    );

    const renderSelect = (label, name, options) => (
        <div className="school-field" key={name}>
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={schoolData[name]}
                onChange={updateField}
            >
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );

    const renderSection = () => {

        switch (activeTab) {

            case "Basic Information":
                return (
                    <>
                        <div className="school-section-heading">
                            <h3>Basic School Information</h3>
                            <p>Manage the official identity and contact details of your school.</p>
                        </div>

                        <div className="school-logo-section">
                            <img
                                src="/images/rms-world-school-shield.png"
                                alt="RMS World School"
                            />
                            <div>
                                <h4>RMS World School</h4>
                                <p>Official school logo</p>
                            </div>
                        </div>

                        <div className="school-form-grid">
                            {renderInput("School Name", "schoolName")}
                            {renderSelect("School Type", "schoolType", [
                                "Private School",
                                "Government School",
                                "Other"
                            ])}
                            {renderInput("School Address", "address")}
                            {renderInput("City", "city")}
                            {renderInput("State", "state")}
                            {renderInput("PIN Code", "pincode")}
                            {renderInput("Contact Number", "phone", "tel")}
                            {renderInput("Official Email", "email", "email")}
                            {renderInput("Website", "website")}
                            {renderInput("Affiliation Number", "affiliationNumber")}
                            {renderInput("Registration Number", "registrationNumber")}
                        </div>
                    </>
                );

            case "Academic Information":
                return (
                    <>
                        <div className="school-section-heading">
                            <h3>Academic Information</h3>
                            <p>Configure academic sessions and school working schedules.</p>
                        </div>

                        <div className="school-form-grid">
                            {renderInput("Academic Session", "academicSession")}
                            {renderInput("Session Start Date", "sessionStart", "date")}
                            {renderInput("Session End Date", "sessionEnd", "date")}
                            {renderSelect("Working Days", "workingDays", [
                                "Monday to Saturday",
                                "Monday to Friday",
                                "Monday to Sunday"
                            ])}
                            {renderSelect("Weekly Holiday", "weeklyHoliday", [
                                "Sunday",
                                "Saturday",
                                "Saturday and Sunday"
                            ])}
                            {renderInput("School Start Time", "schoolStartTime", "time")}
                            {renderInput("School End Time", "schoolEndTime", "time")}
                        </div>
                    </>
                );

            case "Administration":
                return (
                    <>
                        <div className="school-section-heading">
                            <h3>School Administration</h3>
                            <p>Maintain principal and administrative contact details.</p>
                        </div>

                        <div className="school-form-grid">
                            {renderInput("Principal Name", "principalName")}
                            {renderInput("Principal Contact", "principalPhone", "tel")}
                            {renderInput("Principal Email", "principalEmail", "email")}
                            {renderInput("Admin Name", "adminName")}
                            {renderInput("Management Name", "managementName")}
                        </div>
                    </>
                );

            case "Payroll Configuration":
                return (
                    <>
                        <div className="school-section-heading">
                            <h3>Payroll Configuration</h3>
                            <p>Configure school salary processing preferences.</p>
                        </div>

                        <div className="school-form-grid">
                            {renderSelect("Salary Payment Date", "salaryPaymentDate",
                                Array.from({ length: 28 }, (_, i) => String(i + 1))
                            )}
                            {renderSelect("Salary Calculation", "salaryCalculation", [
                                "Monthly",
                                "Daily"
                            ])}
                            {renderInput("Monthly Working Days", "monthlyWorkingDays", "number")}
                            {renderSelect("PF Applicable", "pfApplicable", [
                                "No",
                                "Yes"
                            ])}
                            {renderSelect("Tax Applicable", "taxApplicable", [
                                "No",
                                "Yes"
                            ])}
                        </div>

                        <div className="school-info-note">
                            <Wallet size={20} />
                            <p>
                                These are school-level payroll preferences.
                                Individual employee salary structures should
                                remain managed in the Salary module.
                            </p>
                        </div>
                    </>
                );

            case "Attendance Policies":
                return (
                    <>
                        <div className="school-section-heading">
                            <h3>Attendance & Leave Policies</h3>
                            <p>Set attendance timings and correction approval preferences.</p>
                        </div>

                        <div className="school-form-grid">
                            {renderInput("Reporting Time", "reportingTime", "time")}
                            {renderInput("Late Arrival After", "lateAfter", "time")}
                            {renderInput("Half Day After", "halfDayAfter", "time")}
                            {renderSelect("Attendance Method", "attendanceMethod", [
                                "Punch In / Punch Out",
                                "Manual Attendance",
                                "Both"
                            ])}
                            {renderSelect("Correction Approval", "correctionApproval", [
                                "Admin Approval Required",
                                "Automatic Approval"
                            ])}
                        </div>
                    </>
                );

            case "Documents":
                return (
                    <>
                        <div className="school-section-heading">
                            <h3>School Documents</h3>
                            <p>Keep records of important school certificates and documents.</p>
                        </div>

                        <div className="school-document-list">
                            <div className="school-document-item">
                                <FileText size={23} />
                                <div>
                                    <h4>School Registration Certificate</h4>
                                    <p>Registration document reference</p>
                                </div>
                                <input
                                    type="text"
                                    name="registrationDocument"
                                    value={schoolData.registrationDocument}
                                    onChange={updateField}
                                    placeholder="Enter document reference"
                                />
                            </div>

                            <div className="school-document-item">
                                <GraduationCap size={23} />
                                <div>
                                    <h4>School Affiliation Document</h4>
                                    <p>Affiliation certificate reference</p>
                                </div>
                                <input
                                    type="text"
                                    name="affiliationDocument"
                                    value={schoolData.affiliationDocument}
                                    onChange={updateField}
                                    placeholder="Enter document reference"
                                />
                            </div>

                            <div className="school-document-item">
                                <FileText size={23} />
                                <div>
                                    <h4>Other Documents</h4>
                                    <p>Additional document references</p>
                                </div>
                                <input
                                    type="text"
                                    name="otherDocuments"
                                    value={schoolData.otherDocuments}
                                    onChange={updateField}
                                    placeholder="Enter document reference"
                                />
                            </div>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="school-page">

            {/* Page Header */}

            <div className="school-page-header">
                <div>
                    <h2>School Profile</h2>
                    <p>Manage RMS World School information and configurations.</p>
                </div>

                <span className="school-status">
                    <CheckCircle size={16} />
                    Active School
                </span>
            </div>

            {/* School Profile Banner */}

            <div className="school-profile-banner">

                <img
                    src="/images/rms-world-school-shield.png"
                    alt="RMS School Logo"
                />

                <div className="school-banner-details">
                    <h2>{schoolData.schoolName}</h2>

                    <p>
                        <MapPin size={15} />
                        {schoolData.address}
                    </p>

                    <div className="school-banner-contact">
                        <span>
                            <Phone size={14} />
                            {schoolData.phone || "Contact number not added"}
                        </span>

                        <span>
                            <Mail size={14} />
                            {schoolData.email || "Email not added"}
                        </span>
                    </div>
                </div>

            </div>

            {/* Overview Cards */}

            <div className="school-overview-grid">

                <div className="school-overview-card">
                    <Users size={23} />
                    <span>Total Employees</span>
                    <h3>—</h3>
                    <small>Connect employee data</small>
                </div>

                <div className="school-overview-card">
                    <Building2 size={23} />
                    <span>Departments</span>
                    <h3>—</h3>
                    <small>Department records</small>
                </div>

                <div className="school-overview-card">
                    <CalendarDays size={23} />
                    <span>Academic Session</span>
                    <h3>{schoolData.academicSession}</h3>
                    <small>Current session</small>
                </div>

                <div className="school-overview-card">
                    <CheckCircle size={23} />
                    <span>School Status</span>
                    <h3>Active</h3>
                    <small>School profile</small>
                </div>

            </div>

            {/* Settings Section */}

            <div className="school-settings-card">

                <div className="school-tabs">

                    {tabs.map(tab => {
                        const Icon = tab.icon;

                        return (
                            <button
                                key={tab.name}
                                className={
                                    activeTab === tab.name
                                        ? "school-tab active"
                                        : "school-tab"
                                }
                                onClick={() => setActiveTab(tab.name)}
                            >
                                <Icon size={18} />
                                <span>{tab.name}</span>
                            </button>
                        );
                    })}

                </div>

                <form onSubmit={handleSave}>

                    <div className="school-form-content">
                        {renderSection()}
                    </div>

                    <div className="school-form-footer">

                        {saved && (
                            <span className="school-saved-message">
                                <CheckCircle size={17} />
                                Changes saved in this session
                            </span>
                        )}

                        <button type="submit" className="school-save-button">
                            <Save size={17} />
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default School;
