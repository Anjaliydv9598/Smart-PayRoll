
import React, { useState } from "react";
import "./MasterDataNumberSeries.css";

const initialForm = {
    department: "",
    prefix: "",
    startNumber: 1,
    endNumber: 999,
    numberLength: 3,
    nextNumber: 1,
    active: true
};

const MasterDataNumberSeries = () => {

    const [series, setSeries] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !form.department.trim() ||
            !form.prefix.trim() ||
            Number(form.startNumber) > Number(form.endNumber)
        ) {
            alert("Please enter valid number series details.");
            return;
        }

        const newSeries = {
            ...form,
            id: editingId || Date.now(),
            startNumber: Number(form.startNumber),
            endNumber: Number(form.endNumber),
            numberLength: Number(form.numberLength),
            nextNumber: Number(form.nextNumber)
        };

        if (editingId) {
            setSeries(prev =>
                prev.map(item =>
                    item.id === editingId ? newSeries : item
                )
            );
        } else {
            setSeries(prev => [...prev, newSeries]);
        }

        setForm(initialForm);
        setEditingId(null);
    };

    const handleEdit = (item) => {
        setForm({ ...item });
        setEditingId(item.id);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this number series?")) {
            setSeries(prev => prev.filter(item => item.id !== id));
        }
    };

    const toggleStatus = (id) => {
        setSeries(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, active: !item.active }
                    : item
            )
        );
    };

    const resetForm = () => {
        setForm(initialForm);
        setEditingId(null);
    };

    return (
        <div className="number-series-page">

            <div className="series-heading">
                <div>
                    <h2>Master Data No. Series</h2>
                    <p>
                        Configure automatic identification
                        numbers for school departments.
                    </p>
                </div>

                <div className="series-heading-icon">
                    <i className="bi bi-hash"></i>
                </div>
            </div>

            <div className="series-summary">

                <div className="series-stat">
                    <span>Total Series</span>
                    <h2>{series.length}</h2>
                </div>

                <div className="series-stat">
                    <span>Active Series</span>
                    <h2>
                        {series.filter(item => item.active).length}
                    </h2>
                </div>

                <div className="series-stat">
                    <span>Inactive Series</span>
                    <h2>
                        {series.filter(item => !item.active).length}
                    </h2>
                </div>

            </div>

            <div className="series-card">

                <div className="series-card-heading">
                    <h3>
                        {editingId ? "Edit Number Series" : "Create Number Series"}
                    </h3>
                    <span>Series Configuration</span>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="series-form-grid">

                        <div className="series-field">
                            <label>Department</label>
                            <input
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                placeholder="e.g. Teaching"
                                required
                            />
                        </div>

                        <div className="series-field">
                            <label>Prefix</label>
                            <input
                                name="prefix"
                                value={form.prefix}
                                onChange={handleChange}
                                placeholder="e.g. T"
                                required
                            />
                        </div>

                        <div className="series-field">
                            <label>Starting Number</label>
                            <input
                                type="number"
                                name="startNumber"
                                min="0"
                                value={form.startNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="series-field">
                            <label>Ending Number</label>
                            <input
                                type="number"
                                name="endNumber"
                                min="0"
                                value={form.endNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="series-field">
                            <label>Number Length</label>
                            <input
                                type="number"
                                name="numberLength"
                                min="1"
                                max="12"
                                value={form.numberLength}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="series-field">
                            <label>Next Available Number</label>
                            <input
                                type="number"
                                name="nextNumber"
                                min="0"
                                value={form.nextNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="series-preview">
                        <span>Number Preview</span>
                        <strong>
                            {form.prefix || "T"}
                            {String(form.nextNumber || 0).padStart(
                                Number(form.numberLength) || 3,
                                "0"
                            )}
                        </strong>
                    </div>

                    <label className="series-checkbox">
                        <input
                            type="checkbox"
                            name="active"
                            checked={form.active}
                            onChange={handleChange}
                        />
                        Active Series
                    </label>

                    <div className="series-actions">
                        <button type="button" onClick={resetForm}
                                className="series-cancel">
                            Reset
                        </button>

                        <button type="submit" className="series-save">
                            {editingId ? "Update Series" : "Save Series"}
                        </button>
                    </div>

                </form>
            </div>

            <div className="series-card">

                <div className="series-card-heading">
                    <h3>Configured Number Series</h3>
                    <span>{series.length} records</span>
                </div>

                <div className="series-table-wrapper">

                    <table className="series-table">

                        <thead>
                        <tr>
                            <th>Department</th>
                            <th>Prefix</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Length</th>
                            <th>Next Number</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>

                        {series.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="series-empty">
                                    No number series configured yet.
                                </td>
                            </tr>
                        ) : (
                            series.map(item => (
                                <tr key={item.id}>
                                    <td>{item.department}</td>
                                    <td>
                                        <strong>{item.prefix}</strong>
                                    </td>
                                    <td>{item.startNumber}</td>
                                    <td>{item.endNumber}</td>
                                    <td>{item.numberLength}</td>
                                    <td>
                                        {item.prefix}
                                        {String(item.nextNumber).padStart(
                                            item.numberLength, "0"
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className={`series-status ${
                                                item.active ? "active" : "inactive"
                                            }`}
                                            onClick={() => toggleStatus(item.id)}
                                        >
                                            {item.active ? "Active" : "Inactive"}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="series-edit"
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="series-delete"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default MasterDataNumberSeries;
