import React, { useEffect, useState } from "react";
import "./Department.css";

const API_URL =
    `${(import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api")
        .replace(/\/+$/, "")}/employee-number-series`;

function Department({ onEditSeries }) {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Unable to load departments");
            }

            const data = await response.json();
            setDepartments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    if (loading) return <p>Loading departments...</p>;

    return (
        <div className="department-page">
            <div className="department-header">
                <h2>Department Management</h2>
                <p>Departments configured through Master Data Number Series.</p>
            </div>

            {error && <p className="department-error">{error}</p>}

            {!error && departments.length === 0 && (
                <div className="department-empty">
                    No departments configured yet. Create a Number Series first.
                </div>
            )}

            <div className="department-grid">
                {departments.map((item) => (
                    <div className="department-card" key={item.id}>
                        <div className="department-card-top">
                            <div className="department-icon">🏢</div>

                            <span
                                className={
                                    item.active
                                        ? "department-active"
                                        : "department-inactive"
                                }
                            >
                {item.active ? "Active" : "Inactive"}
              </span>
                        </div>

                        <h3>{item.department}</h3>

                        <div className="department-details">
                            <p>
                                <span>Prefix</span>
                                <strong>{item.prefix}</strong>
                            </p>

                            <p>
                                <span>Number Range</span>
                                <strong>
                                    {item.startNumber} - {item.endNumber}
                                </strong>
                            </p>

                            <p>
                                <span>Next Employee ID</span>
                                <strong>{item.nextEmployeeId}</strong>
                            </p>
                        </div>

                        <button
                            className="department-edit-button"
                            onClick={() => onEditSeries?.(item.id)}
                        >
                            Edit Number Series
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Department;