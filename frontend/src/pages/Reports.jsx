function Reports() {

    return (
        <div>

            <div className="page-header">

                <div>

                    <p className="small-heading">
                        REPORTING
                    </p>

                    <h1>Reports 📊</h1>

                    <p>
                        View employee and payroll reports.
                    </p>

                </div>

            </div>


            <div className="report-grid">

                <div className="report-card">
                    <span>👥</span>
                    <h3>Employee Report</h3>
                    <p>
                        View employee information and records.
                    </p>
                    <button>View Report</button>
                </div>


                <div className="report-card">
                    <span>💰</span>
                    <h3>Payroll Report</h3>
                    <p>
                        View monthly payroll information.
                    </p>
                    <button>View Report</button>
                </div>


                <div className="report-card">
                    <span>📅</span>
                    <h3>Attendance Report</h3>
                    <p>
                        Attendance-based reporting.
                    </p>
                    <button>View Report</button>
                </div>

            </div>

        </div>
    );
}

export default Reports;