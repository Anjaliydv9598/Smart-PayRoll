import { useEffect, useState } from "react";

import {
    getHolidays,
    addHoliday,
    updateHoliday,
    deleteHoliday
} from "../services/holidayService";


function Holidays() {

    const currentYear = new Date().getFullYear();

    const [year, setYear] = useState(currentYear);
    const [holidays, setHolidays] = useState([]);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        holidayDate: "",
        holidayName: "",
        holidayType: "SCHOOL"
    });


    // Load holidays
    useEffect(() => {
        loadHolidays();
    }, [year]);


    const loadHolidays = async () => {

        try {

            setLoading(true);

            const data = await getHolidays(year);

            setHolidays(data);

        } catch (error) {

            console.error(error);

            alert(error.message);

            setHolidays([]);

        } finally {

            setLoading(false);

        }
    };


    // Handle input changes
    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    };


    // Reset form
    const resetForm = () => {

        setForm({
            holidayDate: "",
            holidayName: "",
            holidayType: "SCHOOL"
        });

        setEditingId(null);
    };


    // Add or update holiday
    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!form.holidayDate) {

            alert("Please select holiday date.");

            return;
        }


        if (!form.holidayName.trim()) {

            alert("Please enter holiday name.");

            return;
        }


        try {

            setSaving(true);


            if (editingId) {

                await updateHoliday(
                    editingId,
                    form
                );

                alert("Holiday updated successfully.");

            } else {

                await addHoliday(form);

                alert("Holiday added successfully.");
            }


            resetForm();

            await loadHolidays();


        } catch (error) {

            console.error(error);

            alert(error.message);

        } finally {

            setSaving(false);
        }
    };


    // Edit holiday
    const handleEdit = (holiday) => {

        setEditingId(holiday.id);

        setForm({
            holidayDate: holiday.holidayDate,
            holidayName: holiday.holidayName,
            holidayType: holiday.holidayType
        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // Delete holiday
    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this holiday?"
        );


        if (!confirmed) {
            return;
        }


        try {

            await deleteHoliday(id);

            alert("Holiday deleted successfully.");

            await loadHolidays();

        } catch (error) {

            console.error(error);

            alert(error.message);
        }
    };


    // Format date
    const formatDate = (date) => {

        if (!date) {
            return "";
        }

        const parts = date.split("-");

        if (parts.length !== 3) {
            return date;
        }

        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };


    // Holiday type label
    const getTypeLabel = (type) => {

        switch (type) {

            case "GOVERNMENT":
                return "Government";

            case "SCHOOL":
                return "School";

            case "TRADITIONAL":
                return "Traditional";

            case "OPTIONAL":
                return "Optional";

            default:
                return type;
        }
    };


    return (
        <div>

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>

                    <p className="small-heading">
                        HOLIDAY MANAGEMENT
                    </p>

                    <h1>
                        Holidays 📅
                    </h1>

                    <p>
                        Manage the school's holiday calendar.
                    </p>

                </div>


                <div className="employee-total">

                    <strong>
                        {holidays.length}
                    </strong>

                    <span>
                        Holidays
                    </span>

                </div>

            </div>



            {/* ADD / EDIT HOLIDAY */}

            <div className="employee-search">

                <div style={{ width: "100%" }}>

                    <p className="small-heading">

                        {editingId
                            ? "EDIT HOLIDAY"
                            : "ADD HOLIDAY"}

                    </p>


                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "1fr 1.5fr 1fr auto",
                            gap: "15px",
                            alignItems: "end",
                            marginTop: "12px"
                        }}
                    >

                        {/* DATE */}

                        <div>

                            <label>
                                Holiday Date
                            </label>

                            <input
                                type="date"
                                name="holidayDate"
                                value={form.holidayDate}
                                onChange={handleChange}
                            />

                        </div>


                        {/* HOLIDAY NAME */}

                        <div>

                            <label>
                                Holiday Name
                            </label>

                            <input
                                type="text"
                                name="holidayName"
                                placeholder="Example: Independence Day"
                                value={form.holidayName}
                                onChange={handleChange}
                            />

                        </div>


                        {/* HOLIDAY TYPE */}

                        <div>

                            <label>
                                Holiday Type
                            </label>

                            <select
                                name="holidayType"
                                value={form.holidayType}
                                onChange={handleChange}
                            >

                                <option value="GOVERNMENT">
                                    GOVERNMENT
                                </option>

                                <option value="SCHOOL">
                                    SCHOOL
                                </option>

                                <option value="TRADITIONAL">
                                    TRADITIONAL
                                </option>

                                <option value="OPTIONAL">
                                    OPTIONAL
                                </option>

                            </select>

                        </div>


                        {/* BUTTONS */}

                        <div
                            style={{
                                display: "flex",
                                gap: "8px"
                            }}
                        >

                            <button
                                type="submit"
                                className="search-button"
                                disabled={saving}
                            >

                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Update"
                                        : "Add Holiday"}

                            </button>


                            {editingId && (

                                <button
                                    type="button"
                                    className="search-button"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>

                            )}

                        </div>

                    </form>

                </div>

            </div>



            {/* YEAR FILTER */}

            <div
                style={{
                    marginTop: "25px",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}
            >

                <label>
                    View Year
                </label>


                <select
                    value={year}
                    onChange={(event) =>
                        setYear(
                            Number(event.target.value)
                        )
                    }
                >

                    {[
                        currentYear - 1,
                        currentYear,
                        currentYear + 1,
                        currentYear + 2
                    ].map((item) => (

                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>

                    ))}

                </select>

            </div>



            {/* HOLIDAY LIST */}

            {loading ? (

                <div className="empty-state">

                    <h3>
                        Loading holidays...
                    </h3>

                </div>

            ) : holidays.length === 0 ? (

                <div className="empty-state">

                    <div className="empty-icon">
                        📅
                    </div>

                    <h3>
                        No holidays found
                    </h3>

                    <p>
                        Add a holiday to the school's calendar.
                    </p>

                </div>

            ) : (

                <div className="employee-table-card">

                    <div className="table-header">

                        <div>

                            <p className="small-heading">
                                SCHOOL HOLIDAY CALENDAR
                            </p>

                            <h2>
                                {year} Holidays
                            </h2>

                        </div>


                        <span className="result-count">

                            {holidays.length} holiday
                            {holidays.length !== 1
                                ? "s"
                                : ""}

                        </span>

                    </div>


                    <div className="table-wrapper">

                        <table>

                            <thead>

                            <tr>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Holiday Name
                                </th>

                                <th>
                                    Holiday Type
                                </th>

                                <th>
                                    Source
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                            </thead>


                            <tbody>

                            {holidays.map(
                                (holiday) => (

                                    <tr
                                        key={holiday.id}
                                    >

                                        <td>

                                            <strong>
                                                {formatDate(
                                                    holiday.holidayDate
                                                )}
                                            </strong>

                                        </td>


                                        <td>

                                            <strong>
                                                {holiday.holidayName}
                                            </strong>

                                        </td>


                                        <td>

                                            <span className="role-badge">

                                                {getTypeLabel(
                                                    holiday.holidayType
                                                )}

                                            </span>

                                        </td>


                                        <td>

                                            {holiday.source || "ADMIN"}

                                        </td>


                                        <td>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "8px"
                                                }}
                                            >

                                                <button
                                                    className="search-button"
                                                    onClick={() =>
                                                        handleEdit(
                                                            holiday
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    className="search-button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            holiday.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>
    );
}


export default Holidays;