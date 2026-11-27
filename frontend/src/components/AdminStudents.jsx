
import React, { useCallback, useEffect, useState } from "react";
import "./AdminStudents.css";

const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const EMPTY_FORM = {
    fullName: "",
    dateOfBirth: "",
    className: "",
    section: "",
    rollNumber: "",
    email: "",
    fatherName: "",
    fatherMobile: "",
    motherName: "",
    motherMobile: "",
    alternativeMobile: ""
};

async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        credentials: "include",
        headers: {
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers
        }
    });

    if (response.status === 204) {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return null;
    }

    const contentType = response.headers.get("content-type") || "";
    const result = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const message =
            result?.detail ||
            result?.message ||
            result?.error ||
            (typeof result === "string" ? result : "") ||
            `Request failed (${response.status})`;

        throw new Error(message);
    }

    return result;
}

function StudentForm({ form, setForm, onSubmit, onCancel, saving }) {
    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
    };

    return (
        <form className="admin-student-form" onSubmit={onSubmit}>
            <div className="admin-student-form-grid">
                <label>
                    Full Name *
                    <input
                        name="fullName"
                        value={form.fullName}
                        onChange={updateField}
                        required
                    />
                </label>

                <label>
                    Date of Birth
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={form.dateOfBirth || ""}
                        onChange={updateField}
                    />
                </label>

                <label>
                    Class *
                    <input
                        name="className"
                        value={form.className}
                        onChange={updateField}
                        required
                    />
                </label>

                <label>
                    Section *
                    <input
                        name="section"
                        value={form.section}
                        onChange={updateField}
                        required
                    />
                </label>

                <label>
                    Roll Number *
                    <input
                        name="rollNumber"
                        value={form.rollNumber}
                        onChange={updateField}
                        required
                    />
                </label>

                <label>
                    Email Address *
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={updateField}
                        required
                    />
                </label>

                <label>
                    Father's Name *
                    <input
                        name="fatherName"
                        value={form.fatherName}
                        onChange={updateField}
                        required
                    />
                </label>

                <label>
                    Father's Mobile *
                    <input
                        name="fatherMobile"
                        value={form.fatherMobile}
                        onChange={updateField}
                        pattern="[0-9]{10}"
                        maxLength={10}
                        required
                    />
                </label>

                <label>
                    Mother's Name *
                    <input
                        name="motherName"
                        value={form.motherName}
                        onChange={updateField}
                        required
                    />
                </label>

                <label>
                    Mother's Mobile *
                    <input
                        name="motherMobile"
                        value={form.motherMobile}
                        onChange={updateField}
                        pattern="[0-9]{10}"
                        maxLength={10}
                        required
                    />
                </label>

                <label>
                    Alternative Mobile
                    <input
                        name="alternativeMobile"
                        value={form.alternativeMobile || ""}
                        onChange={updateField}
                        pattern="[0-9]{10}"
                        maxLength={10}
                    />
                </label>
            </div>

            <div className="admin-student-form-actions">
                <button
                    type="button"
                    className="student-btn student-btn-secondary"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="student-btn student-btn-primary"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}

export default function AdminStudents() {
    const [students, setStudents] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editingStudent, setEditingStudent] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);

    const loadStudents = useCallback(async (keyword = "") => {
        setLoading(true);
        setError("");

        try {
            const query = keyword.trim()
                ? `/search?keyword=${encodeURIComponent(keyword.trim())}`
                : "";

            const data = await apiRequest(
                `/api/admin/students${query}`
            );

            setStudents(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || "Unable to load students.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadStudents();
    }, [loadStudents]);

    const handleSearch = (event) => {
        event.preventDefault();
        setSuccess("");
        loadStudents(searchText);
    };

    const openEdit = (student) => {
        setEditingStudent(student);

        setForm({
            fullName: student.fullName || "",
            dateOfBirth: student.dateOfBirth || "",
            className: student.className || "",
            section: student.section || "",
            rollNumber: student.rollNumber || "",
            email: student.email || "",
            fatherName: student.fatherName || "",
            fatherMobile: student.fatherMobile || "",
            motherName: student.motherName || "",
            motherMobile: student.motherMobile || "",
            alternativeMobile: student.alternativeMobile || ""
        });

        setSelectedStudent(null);
        setError("");
        setSuccess("");
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!editingStudent) return;

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            await apiRequest(
                `/api/admin/students/${editingStudent.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        ...form,
                        alternativeMobile: form.alternativeMobile || ""
                    })
                }
            );

            setEditingStudent(null);
            setSuccess("Student details updated successfully.");
            await loadStudents(searchText);
        } catch (err) {
            setError(err.message || "Unable to update student.");
        } finally {
            setSaving(false);
        }
    };

    const changeStudentStatus = async (student) => {
        const action = student.active ? "deactivate" : "activate";

        const confirmed = window.confirm(
            `Are you sure you want to ${action} ${student.fullName}'s account?`
        );

        if (!confirmed) return;

        setError("");
        setSuccess("");

        try {
            await apiRequest(
                `/api/admin/students/${student.id}/${action}`,
                { method: "PATCH" }
            );

            setSuccess(
                `Student account ${action}d successfully.`
            );

            await loadStudents(searchText);
        } catch (err) {
            setError(err.message || `Unable to ${action} student.`);
        }
    };

    const deleteStudent = async (student) => {
        const confirmed = window.confirm(
            `Permanently delete ${student.fullName}? This action cannot be undone.`
        );

        if (!confirmed) return;

        setError("");
        setSuccess("");

        try {
            await apiRequest(
                `/api/admin/students/${student.id}`,
                { method: "DELETE" }
            );

            setSelectedStudent(null);
            setSuccess("Student deleted successfully.");
            await loadStudents(searchText);
        } catch (err) {
            setError(err.message || "Unable to delete student.");
        }
    };

    const closeEdit = () => {
        setEditingStudent(null);
        setForm(EMPTY_FORM);
    };

    return (
        <div className="admin-students-page">
            <div className="admin-students-heading">
                <div>
                    <span className="admin-students-eyebrow">
                        SCHOOL MANAGEMENT
                    </span>
                    <h1>Student Management</h1>
                    <p>View and manage registered school students.</p>
                </div>

                <button
                    className="student-btn student-btn-primary"
                    onClick={() => loadStudents(searchText)}
                    disabled={loading}
                >
                    ↻ Refresh
                </button>
            </div>

            <div className="admin-student-stats">
                <div className="admin-student-stat">
                    <span>Total Students</span>
                    <strong>{students.length}</strong>
                </div>

                <div className="admin-student-stat">
                    <span>Active Accounts</span>
                    <strong>
                        {students.filter((student) => student.active).length}
                    </strong>
                </div>

                <div className="admin-student-stat">
                    <span>Inactive Accounts</span>
                    <strong>
                        {students.filter((student) => !student.active).length}
                    </strong>
                </div>
            </div>

            {error && (
                <div className="admin-student-alert error">
                    {error}
                </div>
            )}

            {success && (
                <div className="admin-student-alert success">
                    {success}
                </div>
            )}

            {editingStudent ? (
                <section className="admin-student-panel">
                    <div className="admin-student-panel-heading">
                        <div>
                            <h2>Edit Student</h2>
                            <p>Update the student's personal information.</p>
                        </div>
                    </div>

                    <StudentForm
                        form={form}
                        setForm={setForm}
                        onSubmit={handleUpdate}
                        onCancel={closeEdit}
                        saving={saving}
                    />
                </section>
            ) : (
                <>
                    <section className="admin-student-panel">
                        <form
                            className="admin-student-search"
                            onSubmit={handleSearch}
                        >
                            <input
                                type="search"
                                placeholder="Search name, email, class, section or roll number..."
                                value={searchText}
                                onChange={(event) =>
                                    setSearchText(event.target.value)
                                }
                            />

                            <button
                                type="submit"
                                className="student-btn student-btn-primary"
                            >
                                Search
                            </button>

                            <button
                                type="button"
                                className="student-btn student-btn-secondary"
                                onClick={() => {
                                    setSearchText("");
                                    loadStudents("");
                                }}
                            >
                                Clear
                            </button>
                        </form>

                        <div className="admin-student-table-heading">
                            <div>
                                <h2>Registered Students</h2>
                                <p>
                                    {students.length} student record(s)
                                </p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="admin-student-empty">
                                Loading students...
                            </div>
                        ) : students.length === 0 ? (
                            <div className="admin-student-empty">
                                No student records found.
                            </div>
                        ) : (
                            <div className="admin-student-table-wrap">
                                <table className="admin-student-table">
                                    <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Class</th>
                                        <th>Section</th>
                                        <th>Roll No.</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {students.map((student) => (
                                        <tr key={student.id}>
                                            <td>
                                                <strong>{student.fullName}</strong>
                                                <small>ID: {student.id}</small>
                                            </td>

                                            <td>{student.className}</td>
                                            <td>{student.section}</td>
                                            <td>{student.rollNumber}</td>
                                            <td>{student.email}</td>

                                            <td>
                                                    <span className={
                                                        student.active
                                                            ? "student-status active"
                                                            : "student-status inactive"
                                                    }>
                                                        {student.active
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>
                                            </td>

                                            <td>
                                                <div className="student-row-actions">
                                                    <button
                                                        title="View details"
                                                        onClick={() =>
                                                            setSelectedStudent(student)
                                                        }
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        title="Edit student"
                                                        onClick={() =>
                                                            openEdit(student)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        title={
                                                            student.active
                                                                ? "Deactivate"
                                                                : "Activate"
                                                        }
                                                        onClick={() =>
                                                            changeStudentStatus(student)
                                                        }
                                                    >
                                                        {student.active
                                                            ? "Deactivate"
                                                            : "Activate"}
                                                    </button>

                                                    <button
                                                        className="student-delete-action"
                                                        title="Delete student"
                                                        onClick={() =>
                                                            deleteStudent(student)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </>
            )}

            {selectedStudent && (
                <div
                    className="admin-student-modal-overlay"
                    onClick={() => setSelectedStudent(null)}
                >
                    <section
                        className="admin-student-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="admin-student-modal-heading">
                            <div>
                                <h2>Student Details</h2>
                                <p>Student ID: {selectedStudent.id}</p>
                            </div>

                            <button
                                onClick={() => setSelectedStudent(null)}
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="admin-student-details-grid">
                            <div><span>Full Name</span><strong>{selectedStudent.fullName}</strong></div>
                            <div><span>Date of Birth</span><strong>{selectedStudent.dateOfBirth || "—"}</strong></div>
                            <div><span>Class</span><strong>{selectedStudent.className}</strong></div>
                            <div><span>Section</span><strong>{selectedStudent.section}</strong></div>
                            <div><span>Roll Number</span><strong>{selectedStudent.rollNumber}</strong></div>
                            <div><span>Email</span><strong>{selectedStudent.email}</strong></div>
                            <div><span>Father's Name</span><strong>{selectedStudent.fatherName}</strong></div>
                            <div><span>Father's Mobile</span><strong>{selectedStudent.fatherMobile}</strong></div>
                            <div><span>Mother's Name</span><strong>{selectedStudent.motherName}</strong></div>
                            <div><span>Mother's Mobile</span><strong>{selectedStudent.motherMobile}</strong></div>
                            <div><span>Alternative Mobile</span><strong>{selectedStudent.alternativeMobile || "—"}</strong></div>
                            <div><span>Account Status</span><strong>{selectedStudent.active ? "Active" : "Inactive"}</strong></div>
                        </div>

                        <div className="admin-student-form-actions">
                            <button
                                className="student-btn student-btn-secondary"
                                onClick={() => setSelectedStudent(null)}
                            >
                                Close
                            </button>

                            <button
                                className="student-btn student-btn-primary"
                                onClick={() => openEdit(selectedStudent)}
                            >
                                Edit Student
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}
