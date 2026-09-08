import { useState } from "react";

const BASE_URL = "http://localhost:8080";

function Payroll() {

    const [employeeId, setEmployeeId] = useState("");
    const [payroll, setPayroll] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generatePayroll = async () => {

        if (!employeeId.trim()) {
            setError("Please enter Employee ID.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setPayroll(null);

            const response = await fetch(
                `${BASE_URL}/api/payroll/generate/${employeeId.trim()}`,
                {
                    method: "POST"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to generate payroll"
                );
            }

            setPayroll(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    const formatAmount = (value) => {
        if (value === null || value === undefined) {
            return "₹0";
        }

        return `₹${Number(value).toLocaleString("en-IN")}`;
    };

    return (
        <div>

            <div className="page-header">

                <div>

                    <p className="small-heading">
                        PAYROLL MANAGEMENT
                    </p>

                    <h1>Payroll 💰</h1>

                    <p>
                        Manage salary and payroll information.
                    </p>

                </div>

            </div>


            <div className="coming-soon">

                <div className="coming-icon">
                    💰
                </div>

                <h2>Payroll Management</h2>

                <p>
                    Generate monthly payroll for an employee.
                </p>


                <div
                    style={{
                        marginTop: "25px",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center"
                    }}
                >

                    <input
                        type="text"
                        placeholder="Employee ID e.g. AS001"
                        value={employeeId}
                        onChange={(e) =>
                            setEmployeeId(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                generatePayroll();
                            }
                        }}
                        style={{
                            height: "44px",
                            width: "230px",
                            border: "1px solid #dfe2ea",
                            borderRadius: "9px",
                            padding: "0 13px",
                            outline: "none"
                        }}
                    />

                    <button
                        className="search-button"
                        onClick={generatePayroll}
                        disabled={loading}
                    >
                        {loading
                            ? "Generating..."
                            : "Generate Payroll"}
                    </button>

                </div>


                {error && (
                    <p
                        style={{
                            color: "#d9534f",
                            marginTop: "15px"
                        }}
                    >
                        {error}
                    </p>
                )}


                {payroll && (

                    <div
                        style={{
                            marginTop: "30px",
                            textAlign: "left",
                            background: "#fafbfc",
                            border: "1px solid #e8ebf2",
                            borderRadius: "12px",
                            padding: "22px"
                        }}
                    >

                        <h3>
                            Payroll Generated Successfully ✅
                        </h3>

                        <p>
                            <strong>Employee ID:</strong>{" "}
                            {payroll.employee?.empId}
                        </p>

                        <p>
                            <strong>Employee Name:</strong>{" "}
                            {payroll.employee?.name}
                        </p>

                        <p>
                            <strong>Financial Year:</strong>{" "}
                            {payroll.financialYear}
                        </p>

                        <p>
                            <strong>Month:</strong>{" "}
                            {payroll.month}
                        </p>

                        <hr />

                        <p>
                            <strong>Basic:</strong>{" "}
                            {formatAmount(payroll.basic)}
                        </p>

                        <p>
                            <strong>HRA:</strong>{" "}
                            {formatAmount(payroll.hra)}
                        </p>

                        <p>
                            <strong>Daily Allowance:</strong>{" "}
                            {formatAmount(payroll.dailyAllowance)}
                        </p>

                        <p>
                            <strong>Travel Allowance:</strong>{" "}
                            {formatAmount(payroll.travelAllowance)}
                        </p>

                        <p>
                            <strong>Bonus:</strong>{" "}
                            {formatAmount(payroll.bonus)}
                        </p>

                        <p>
                            <strong>Incentive:</strong>{" "}
                            {formatAmount(payroll.incentive)}
                        </p>

                        <p>
                            <strong>Miscellaneous:</strong>{" "}
                            {formatAmount(payroll.miscellaneous)}
                        </p>

                        <p>
                            <strong>Gross Salary:</strong>{" "}
                            {formatAmount(payroll.grossSalary)}
                        </p>

                        <hr />

                        <p>
                            <strong>PF:</strong>{" "}
                            {formatAmount(payroll.pf)}
                        </p>

                        <p>
                            <strong>Tax Liability:</strong>{" "}
                            {formatAmount(payroll.taxLiability)}
                        </p>

                        <p>
                            <strong>Other Deductions:</strong>{" "}
                            {formatAmount(payroll.otherDeductions)}
                        </p>

                        <h3>
                            Net Salary:{" "}
                            {formatAmount(payroll.netSalary)}
                        </h3>

                    </div>
                )}

            </div>

        </div>
    );
}

export default Payroll;