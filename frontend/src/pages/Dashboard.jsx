import StatCard from "../components/StatCard";

function Dashboard() {
    return (
        <div>

            <div className="page-header">
                <div>
                    <p className="small-heading">SCHOOL PAYROLL</p>

                    <h1>Good morning, Admin 👋</h1>

                    <p>
                        Here's what's happening with your school payroll today.
                    </p>
                </div>

                <div className="date-card">
                    <span>📅</span>
                    <div>
                        <strong>
                            {new Date().toLocaleDateString("en-IN", {
                                month: "long",
                                year: "numeric"
                            })}
                        </strong>

                        <small>
                            {new Date().toLocaleDateString("en-IN", {
                                weekday: "long",
                                day: "numeric",
                                month: "long"
                            })}
                        </small>
                    </div>
                </div>
            </div>


            {/* Statistics */}

            <div className="stats-grid">

                <StatCard
                    icon="👥"
                    title="Total Employees"
                    value="31"
                    description="Active employees"
                />

                <StatCard
                    icon="👩‍🏫"
                    title="Teachers"
                    value="20"
                    description="Teaching staff"
                />

                <StatCard
                    icon="🧑‍💼"
                    title="Support Staff"
                    value="5"
                    description="Support employees"
                />

                <StatCard
                    icon="💼"
                    title="Accounts Staff"
                    value="5"
                    description="Accounts team"
                />

            </div>


            {/* Main Dashboard */}

            <div className="dashboard-grid">

                <div className="dashboard-card payroll-card">

                    <div className="card-header">
                        <div>
                            <p className="small-heading">PAYROLL</p>
                            <h2>September Payroll</h2>
                        </div>

                        <span className="status-badge">
              ● Processing
            </span>
                    </div>

                    <div className="payroll-amount">
                        ₹14,85,000
                    </div>

                    <p className="muted">
                        Estimated total payroll for September 2026
                    </p>

                    <div className="progress">
                        <div className="progress-bar"></div>
                    </div>

                    <div className="progress-info">
                        <span>26 employees processed</span>
                        <span>84%</span>
                    </div>

                </div>


                <div className="dashboard-card principal-card">

                    <p className="small-heading">SCHOOL LEADERSHIP</p>

                    <h2>Principal</h2>

                    <div className="principal-profile">

                        <div className="large-avatar">
                            P
                        </div>

                        <div>
                            <h3>Principal</h3>
                            <p>School Administration</p>
                        </div>

                    </div>

                    <div className="principal-info">
                        <span>Employee ID</span>
                        <strong>P001</strong>
                    </div>

                </div>

            </div>


            {/* Quick Actions */}

            <div className="section-title">
                <div>
                    <p className="small-heading">QUICK ACCESS</p>
                    <h2>Payroll Management</h2>
                </div>
            </div>

            <div className="quick-grid">

                <div className="quick-card">
                    <span>👥</span>
                    <div>
                        <h3>Employee Records</h3>
                        <p>Search and manage employee information.</p>
                    </div>
                </div>

                <div className="quick-card">
                    <span>💰</span>
                    <div>
                        <h3>Salary Management</h3>
                        <p>View salary and payroll information.</p>
                    </div>
                </div>

                <div className="quick-card">
                    <span>📊</span>
                    <div>
                        <h3>Payroll Reports</h3>
                        <p>Generate payroll and employee reports.</p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;