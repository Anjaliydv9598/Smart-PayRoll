
import React, { useEffect, useState } from "react";
import "./EmployeeManagement.css";

const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"
).replace(/\/+$/, "");

const API_URL = `${API_BASE_URL}/admin/employees`;

const initialForm = {
    name: "",
    aadhaarNo: "",
    panNo: "",
    emailId: "",
    phoneNo: "",
    fatherName: "",
    motherName: "",
    husbandName: "",
    role: "TEACHER",
    joiningDate: "",
    leavingDate: "",
    basic: "",
    hra: "",
    dailyAllowance: "",
    travelAllowance: "",
    bonus: "",
    incentive: "",
    miscellaneous: "",
    taLiability: "",
    total: "",
    financialYear: "",
    forMonth: "",
    taxLiability: ""
};

const EmployeeManagement = () => {

    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState(initialForm);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");

    // Authentication headers
    const getHeaders = () => {
        const token = localStorage.getItem("token");

        return {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
    };

    // Load employees
    const fetchEmployees = async () => {
        try {
            setLoading(true);

            const response = await fetch(API_URL, {
                method: "GET",
                headers: getHeaders()
            });

            if (!response.ok) {
                throw new Error("Unable to fetch employees.");
            }

            const data = await response.json();
            setEmployees(Array.isArray(data) ? data : []);

        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // Open create form
    const handleAddEmployee = () => {
        setEditingId(null);
        setFormData({ ...initialForm });
        setSelectedEmployee(null);
        setMessage("");
        setShowForm(true);
    };

    // Open edit form
    const handleEdit = (employee) => {
        setEditingId(employee.empId);

        const updatedForm = { ...initialForm };

        Object.keys(updatedForm).forEach((key) => {
            updatedForm[key] = employee[key] ?? "";
        });

        setFormData(updatedForm);
        setSelectedEmployee(null);
        setMessage("");
        setShowForm(true);
    };

    // Save employee
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setMessage("");

            const url = editingId
                ? `${API_URL}/${encodeURIComponent(editingId)}`
                : API_URL;

            const method = editingId ? "PUT" : "POST";

            const payload = {
                ...formData,
                basic: formData.basic === "" ? null : Number(formData.basic),
                hra: formData.hra === "" ? null : Number(formData.hra),
                dailyAllowance: formData.dailyAllowance === "" ? null : Number(formData.dailyAllowance),
                travelAllowance: formData.travelAllowance === "" ? null : Number(formData.travelAllowance),
                bonus: formData.bonus === "" ? null : Number(formData.bonus),
                incentive: formData.incentive === "" ? null : Number(formData.incentive),
                miscellaneous: formData.miscellaneous === "" ? null : Number(formData.miscellaneous),
                taLiability: formData.taLiability === "" ? null : Number(formData.taLiability),
                total: formData.total === "" ? null : Number(formData.total),
                taxLiability: formData.taxLiability === "" ? null : Number(formData.taxLiability)
            };

            const response = await fetch(url, {
                method,
                headers: getHeaders(),
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Unable to save employee.");
            }

            setMessage(
                editingId
                    ? "Employee updated successfully."
                    : "Employee created successfully."
            );

            setShowForm(false);
            setEditingId(null);
            setFormData({ ...initialForm });

            await fetchEmployees();

        } catch (error) {
            setMessage(error.message);
        } finally {
            setSaving(false);
        }
    };

    // Search employees
    const filteredEmployees = employees.filter((employee) => {
        const keyword = searchKeyword.toLowerCase();

        return (
            (employee.empId || "").toLowerCase().includes(keyword) ||
            (employee.name || "").toLowerCase().includes(keyword) ||
            (employee.emailId || "").toLowerCase().includes(keyword)
        );
    });

    // Form field helper
    const renderField = (
        label,
        name,
        type = "text",
        required = false
    ) => (
        <div className="employee-form-group" key={name}>
            <label htmlFor={name}>
                {label} {required && <span>*</span>}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required={required}
            />
        </div>
    );

    return (
        <div className="employee-management">

            {/* Header */}
            <div className="employee-page-header">
                <div>
                    <h2>Employee Data Creation</h2>
                    <p>
                        Create, manage and view school employee records.
                    </p>
                </div>

                <button
                    className="employee-primary-btn"
                    onClick={handleAddEmployee}
                >
                    + Add Employee
                </button>
            </div>

            {/* Message */}
            {message && (
                <div className="employee-message">
                    {message}
                    <button onClick={() => setMessage("")}>
                        ×
                    </button>
                </div>
            )}

            {/* Employee Form */}
            {showForm && (
                <div className="employee-form-card">

                    <div className="employee-section-heading">
                        <h3>
                            {editingId ? "Edit Employee" : "Create Employee"}
                        </h3>

                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                        >
                            Close
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <h4>Personal Information</h4>

                        <div className="employee-form-grid">

                            {renderField("Employee Name", "name", "text", true)}

                            {renderField("Aadhaar Number", "aadhaarNo", "text", true)}

                            {renderField("PAN Number", "panNo", "text", true)}

                            {renderField("Email Address", "emailId", "email")}

                            {renderField("Phone Number", "phoneNo", "tel")}

                            {renderField("Father Name", "fatherName")}

                            {renderField("Mother Name", "motherName")}

                            {renderField("Husband Name", "husbandName")}

                        </div>

                        <h4>Employment Information</h4>

                        <div className="employee-form-grid">

                            <div className="employee-form-group">
                                <label>Employee Role <span>*</span></label>

                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    disabled={Boolean(editingId)}
                                >
                                    <option value="TEACHER">Teacher</option>
                                    <option value="PRINCIPAL">Principal</option>
                                    <option value="ACCOUNTS_STAFF">
                                        Accounts Staff
                                    </option>
                                    <option value="SUPPORT_STAFF">
                                        Support Staff
                                    </option>
                                </select>
                            </div>

                            {renderField("Joining Date", "joiningDate", "date")}

                            {renderField("Leaving Date", "leavingDate", "date")}

                        </div>

                        <h4>Salary Information</h4>

                        <div className="employee-form-grid">

                            {renderField("Basic Salary", "basic", "number")}
                            {renderField("HRA", "hra", "number")}
                            {renderField("Daily Allowance", "dailyAllowance", "number")}
                            {renderField("Travel Allowance", "travelAllowance", "number")}
                            {renderField("Bonus", "bonus", "number")}
                            {renderField("Incentive", "incentive", "number")}
                            {renderField("Miscellaneous", "miscellaneous", "number")}
                            {renderField("TA Liability", "taLiability", "number")}
                            {renderField("Total Salary", "total", "number")}
                            {renderField("Tax Liability", "taxLiability", "number")}
                            {renderField("Financial Year", "financialYear")}
                            {renderField("For Month", "forMonth")}

                        </div>

                        <div className="employee-form-actions">

                            <button
                                type="button"
                                className="employee-cancel-btn"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="employee-primary-btn"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Employee"
                                        : "Save Employee"}
                            </button>

                        </div>

                    </form>
                </div>
            )}

            {/* Employee List */}
            <div className="employee-list-card">

                <div className="employee-list-header">
                    <div>
                        <h3>Employee Records</h3>
                        <p>Total Employees: {employees.length}</p>
                    </div>

                    <input
                        type="search"
                        placeholder="Search by ID, name or email..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p className="employee-empty">Loading employees...</p>
                ) : filteredEmployees.length === 0 ? (
                    <p className="employee-empty">
                        No employees found.
                    </p>
                ) : (
                    <div className="employee-table-wrapper">
                        <table className="employee-table">

                            <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.empId}>

                                    <td>{employee.empId}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.role}</td>
                                    <td>{employee.emailId}</td>
                                    <td>{employee.phoneNo}</td>

                                    <td>
                                        <div className="employee-action-buttons">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedEmployee(employee)
                                                }
                                            >
                                                View
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(employee)
                                                }
                                            >
                                                Edit
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>

            {/* Employee Profile */}
            {selectedEmployee && (
                <div className="employee-profile-card">

                    <div className="employee-section-heading">
                        <h3>Employee Profile</h3>

                        <button
                            onClick={() => setSelectedEmployee(null)}
                        >
                            Close
                        </button>
                    </div>

                    <div className="employee-profile-grid">
                        {Object.entries({
                            "Employee ID": selectedEmployee.empId,
                            "Name": selectedEmployee.name,
                            "Role": selectedEmployee.role,
                            "Aadhaar Number": selectedEmployee.aadhaarNo,
                            "PAN Number": selectedEmployee.panNo,
                            "Email": selectedEmployee.emailId,
                            "Phone": selectedEmployee.phoneNo,
                            "Father Name": selectedEmployee.fatherName,
                            "Mother Name": selectedEmployee.motherName,
                            "Husband Name": selectedEmployee.husbandName,
                            "Joining Date": selectedEmployee.joiningDate,
                            "Leaving Date": selectedEmployee.leavingDate
                        }).map(([label, value]) => (
                            <div key={label}>
                                <strong>{label}</strong>
                                <span>{value || "-"}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        className="employee-primary-btn"
                        onClick={() => handleEdit(selectedEmployee)}
                    >
                        Edit Employee
                    </button>

                </div>
            )}

        </div>
    );
};

export default EmployeeManagement;
