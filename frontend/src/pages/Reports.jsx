import { useState } from "react";

const BASE_URL = "http://localhost:8080";

function Reports() {

    const [activeReport, setActiveReport] = useState(null);

    const [employeeId, setEmployeeId] = useState("");
    const [employeeData, setEmployeeData] = useState([]);
    const [employeeLoading, setEmployeeLoading] = useState(false);

    const [attendanceData, setAttendanceData] = useState([]);
    const [attendanceLoading, setAttendanceLoading] = useState(false);

    const [payrollEmployeeId, setPayrollEmployeeId] = useState("");
    const [payrollData, setPayrollData] = useState([]);
    const [payrollLoading, setPayrollLoading] = useState(false);

    const [error, setError] = useState("");


    // ==============================
    // EMPLOYEE REPORT
    // ==============================

    const loadEmployeeReport = async () => {

        if (!employeeId.trim()) {
            setError("Please enter Employee ID.");
            return;
        }

        try {

            setEmployeeLoading(true);
            setError("");
            setEmployeeData([]);

            const response = await fetch(
                `${BASE_URL}/employees/search?empIds=${encodeURIComponent(
                    employeeId.trim()
                )}`
            );

            const text = await response.text();

            let data = [];

            try {
                data = text ? JSON.parse(text) : [];
            } catch {
                throw new Error(
                    "Unable to read employee report response."
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to load employee report"
                );
            }

            setEmployeeData(
                Array.isArray(data) ? data : [data]
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setEmployeeLoading(false);

        }
    };


    // ==============================
    // ATTENDANCE REPORT
    // ==============================

    const loadAttendanceReport = async () => {

        try {

            setAttendanceLoading(true);
            setError("");
            setAttendanceData([]);

            const response = await fetch(
                `${BASE_URL}/api/attendance/today`
            );

            const text = await response.text();

            let data = [];

            try {
                data = text ? JSON.parse(text) : [];
            } catch {
                throw new Error(
                    "Unable to read attendance report response."
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to load attendance report"
                );
            }

            setAttendanceData(
                Array.isArray(data) ? data : []
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setAttendanceLoading(false);

        }
    };


    // ==============================
    // PAYROLL REPORT
    // ==============================

    const generatePayrollReport = async () => {

        if (!payrollEmployeeId.trim()) {
            setError("Please enter Employee ID.");
            return;
        }

        try {

            setPayrollLoading(true);
            setError("");
            setPayrollData([]);

            /*
             * Accepts:
             *
             * AS001
             *
             * OR
             *
             * AS001,AS002,AS003
             */

            const employeeIds = payrollEmployeeId
                .split(",")
                .map((id) => id.trim())
                .filter((id) => id !== "");

            if (employeeIds.length === 0) {
                setError("Please enter valid Employee IDs.");
                return;
            }

            const response = await fetch(
                `${BASE_URL}/api/payroll/generate-multiple`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeIds)
                }
            );

            const text = await response.text();

            let data;

            try {

                data = text
                    ? JSON.parse(text)
                    : [];

            } catch {

                throw new Error(
                    "Unable to read payroll response."
                );

            }

            if (!response.ok) {

                throw new Error(
                    typeof data === "string"
                        ? data
                        : data.message ||
                        "Unable to generate payroll report"
                );

            }

            setPayrollData(
                Array.isArray(data)
                    ? data
                    : [data]
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setPayrollLoading(false);

        }
    };


    // ==============================
    // FORMAT AMOUNT
    // ==============================

    const formatAmount = (value) => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "₹0";
        }

        return `₹${Number(value).toLocaleString("en-IN")}`;
    };


    // ==============================
    // FORMAT DATE TIME
    // ==============================

    const formatDateTime = (value) => {

        if (!value) {
            return "-";
        }

        const date = new Date(value);

        if (isNaN(date.getTime())) {
            return value;
        }

        return date.toLocaleString("en-IN", {
            dateStyle: "short",
            timeStyle: "short"
        });
    };


    // ==============================
    // EMPLOYEE REPORT VIEW
    // ==============================

    const renderEmployeeReport = () => {

        return (
            <div
                className="report-result"
                style={{
                    marginTop: "25px",
                    background: "#fafbfc",
                    border: "1px solid #e8ebf2",
                    borderRadius: "12px",
                    padding: "22px"
                }}
            >

                <h2>Employee Report</h2>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "20px"
                    }}
                >

                    <input
                        type="text"
                        placeholder="Employee IDs e.g. AS001,AS002"
                        value={employeeId}
                        onChange={(e) =>
                            setEmployeeId(e.target.value)
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {
                                loadEmployeeReport();
                            }

                        }}
                        style={{
                            height: "44px",
                            flex: "1",
                            border: "1px solid #dfe2ea",
                            borderRadius: "9px",
                            padding: "0 13px"
                        }}
                    />

                    <button
                        className="search-button"
                        onClick={loadEmployeeReport}
                        disabled={employeeLoading}
                    >
                        {employeeLoading
                            ? "Loading..."
                            : "Search"}
                    </button>

                </div>


                {employeeData.length > 0 && (

                    <div
                        style={{
                            marginTop: "25px",
                            overflowX: "auto"
                        }}
                    >

                        <table>

                            <thead>

                            <tr>

                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Joining Date</th>
                                <th>Basic Salary</th>

                            </tr>

                            </thead>


                            <tbody>

                            {employeeData.map((employee) => (

                                <tr key={employee.empId}>

                                    <td>
                                        <strong>
                                            {employee.empId}
                                        </strong>
                                    </td>

                                    <td>
                                        {employee.name}
                                    </td>

                                    <td>
                                        {employee.role}
                                    </td>

                                    <td>
                                        {employee.emailId || "-"}
                                    </td>

                                    <td>
                                        {employee.phoneNo || "-"}
                                    </td>

                                    <td>
                                        {employee.joiningDate || "-"}
                                    </td>

                                    <td>
                                        {formatAmount(
                                            employee.basic
                                        )}
                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                )}


                {!employeeLoading &&
                    employeeData.length === 0 && (

                        <p
                            style={{
                                marginTop: "20px"
                            }}
                        >
                            Enter Employee ID and click Search.
                        </p>

                    )}

            </div>
        );
    };


    // ==============================
    // ATTENDANCE REPORT VIEW
    // ==============================

    const renderAttendanceReport = () => {

        return (
            <div
                className="report-result"
                style={{
                    marginTop: "25px",
                    background: "#fafbfc",
                    border: "1px solid #e8ebf2",
                    borderRadius: "12px",
                    padding: "22px"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <div>

                        <h2>
                            Today's Attendance Report
                        </h2>

                        <p>
                            Attendance records for the current date.
                        </p>

                    </div>


                    <button
                        className="search-button"
                        onClick={loadAttendanceReport}
                        disabled={attendanceLoading}
                    >
                        {attendanceLoading
                            ? "Loading..."
                            : "Refresh"}
                    </button>

                </div>


                {attendanceData.length > 0 && (

                    <div
                        style={{
                            marginTop: "25px",
                            overflowX: "auto"
                        }}
                    >

                        <table>

                            <thead>

                            <tr>

                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Punch In</th>
                                <th>Punch Out</th>
                                <th>Working Hours</th>
                                <th>Status</th>

                            </tr>

                            </thead>


                            <tbody>

                            {attendanceData.map(
                                (attendance) => (

                                    <tr key={attendance.id}>

                                        <td>
                                            <strong>
                                                {
                                                    attendance
                                                        .employee
                                                        ?.empId
                                                }
                                            </strong>
                                        </td>

                                        <td>
                                            {
                                                attendance
                                                    .employee
                                                    ?.name
                                            }
                                        </td>

                                        <td>
                                            {
                                                attendance
                                                    .attendanceDate
                                            }
                                        </td>

                                        <td>
                                            {formatDateTime(
                                                attendance.punchIn
                                            )}
                                        </td>

                                        <td>
                                            {formatDateTime(
                                                attendance.punchOut
                                            )}
                                        </td>

                                        <td>
                                            {
                                                attendance
                                                    .workingHours !==
                                                null &&
                                                attendance
                                                    .workingHours !==
                                                undefined
                                                    ? `${attendance.workingHours} hrs`
                                                    : "-"
                                            }
                                        </td>

                                        <td>
                                            {
                                                attendance.status
                                            }
                                        </td>

                                    </tr>

                                )
                            )}

                            </tbody>

                        </table>

                    </div>

                )}


                {!attendanceLoading &&
                    attendanceData.length === 0 && (

                        <p
                            style={{
                                marginTop: "20px"
                            }}
                        >
                            Click Refresh to load today's
                            attendance.
                        </p>

                    )}

            </div>
        );
    };


    // ==============================
    // PAYROLL REPORT VIEW
    // ==============================

    const renderPayrollReport = () => {

        return (
            <div
                className="report-result"
                style={{
                    marginTop: "25px",
                    background: "#fafbfc",
                    border: "1px solid #e8ebf2",
                    borderRadius: "12px",
                    padding: "22px"
                }}
            >

                <h2>Payroll Report</h2>

                <p>
                    Generate monthly payroll information
                    for one or multiple employees.
                </p>


                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "20px"
                    }}
                >

                    <input
                        type="text"
                        placeholder="Employee IDs e.g. AS001,AS002,AS003"
                        value={payrollEmployeeId}
                        onChange={(e) =>
                            setPayrollEmployeeId(
                                e.target.value
                            )
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {
                                generatePayrollReport();
                            }

                        }}
                        style={{
                            height: "44px",
                            flex: "1",
                            border: "1px solid #dfe2ea",
                            borderRadius: "9px",
                            padding: "0 13px"
                        }}
                    />


                    <button
                        className="search-button"
                        onClick={generatePayrollReport}
                        disabled={payrollLoading}
                    >
                        {payrollLoading
                            ? "Generating..."
                            : "Generate"}
                    </button>

                </div>


                {payrollData.length > 0 && (

                    <div
                        style={{
                            marginTop: "25px",
                            overflowX: "auto"
                        }}
                    >

                        <h3>
                            Payroll Generated
                            Successfully ✅
                        </h3>


                        <table
                            style={{
                                marginTop: "15px"
                            }}
                        >

                            <thead>

                            <tr>

                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Financial Year</th>
                                <th>Month</th>
                                <th>Basic</th>
                                <th>Gross Salary</th>
                                <th>PF</th>
                                <th>Tax</th>
                                <th>Net Salary</th>

                            </tr>

                            </thead>


                            <tbody>

                            {payrollData.map((payroll) => (

                                <tr key={payroll.id}>

                                    <td>
                                        <strong>
                                            {
                                                payroll
                                                    .employee
                                                    ?.empId
                                            }
                                        </strong>
                                    </td>

                                    <td>
                                        {
                                            payroll
                                                .employee
                                                ?.name
                                        }
                                    </td>

                                    <td>
                                        {
                                            payroll
                                                .financialYear
                                        }
                                    </td>

                                    <td>
                                        {payroll.month}
                                    </td>

                                    <td>
                                        {formatAmount(
                                            payroll.basic
                                        )}
                                    </td>

                                    <td>
                                        {formatAmount(
                                            payroll.grossSalary
                                        )}
                                    </td>

                                    <td>
                                        {formatAmount(
                                            payroll.pf
                                        )}
                                    </td>

                                    <td>
                                        {formatAmount(
                                            payroll.taxLiability
                                        )}
                                    </td>

                                    <td>
                                        <strong>
                                            {formatAmount(
                                                payroll.netSalary
                                            )}
                                        </strong>
                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                )}


                {!payrollLoading &&
                    payrollData.length === 0 && (

                        <p
                            style={{
                                marginTop: "20px"
                            }}
                        >
                            Enter one or multiple Employee IDs
                            separated by commas.
                        </p>

                    )}

            </div>
        );
    };


    // ==============================
    // MAIN REPORT PAGE
    // ==============================

    return (
        <div>

            <div className="page-header">

                <div>

                    <p className="small-heading">
                        REPORTING
                    </p>

                    <h1>
                        Reports 📊
                    </h1>

                    <p>
                        View employee and payroll reports.
                    </p>

                </div>

            </div>


            {error && (

                <div
                    style={{
                        color: "#d9534f",
                        background: "#fff5f5",
                        border: "1px solid #ffd6d6",
                        borderRadius: "9px",
                        padding: "12px 15px",
                        marginBottom: "20px"
                    }}
                >
                    {error}
                </div>

            )}


            <div className="report-grid">


                {/* ==============================
                    EMPLOYEE REPORT
                ============================== */}

                <div className="report-card">

                    <span>👥</span>

                    <h3>
                        Employee Report
                    </h3>

                    <p>
                        View employee information and records.
                    </p>

                    <button
                        onClick={() => {

                            setActiveReport("employee");
                            setError("");

                        }}
                    >
                        View Report
                    </button>

                </div>


                {/* ==============================
                    PAYROLL REPORT
                ============================== */}

                <div className="report-card">

                    <span>💰</span>

                    <h3>
                        Payroll Report
                    </h3>

                    <p>
                        View monthly payroll information.
                    </p>

                    <button
                        onClick={() => {

                            setActiveReport("payroll");
                            setError("");

                        }}
                    >
                        View Report
                    </button>

                </div>


                {/* ==============================
                    ATTENDANCE REPORT
                ============================== */}

                <div className="report-card">

                    <span>📅</span>

                    <h3>
                        Attendance Report
                    </h3>

                    <p>
                        Attendance-based reporting.
                    </p>

                    <button
                        onClick={() => {

                            setActiveReport("attendance");
                            setError("");

                        }}
                    >
                        View Report
                    </button>

                </div>

            </div>


            {/* ==============================
                REPORT CONTENT
            ============================== */}

            {activeReport === "employee" &&
                renderEmployeeReport()}

            {activeReport === "payroll" &&
                renderPayrollReport()}

            {activeReport === "attendance" &&
                renderAttendanceReport()}

        </div>
    );
}

export default Reports;