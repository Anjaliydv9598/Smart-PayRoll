
import React from "react";
import DashboardCards from "../components/DashboardCards.jsx";
import "./DashboardHome.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

const attendanceData = [
    { day: "Mon", present: 210, absent: 20 },
    { day: "Tue", present: 218, absent: 12 },
    { day: "Wed", present: 205, absent: 25 },
    { day: "Thu", present: 220, absent: 10 },
    { day: "Fri", present: 215, absent: 15 }
];

const staffData = [
    { name: "Teaching", value: 170 },
    { name: "Non-teaching", value: 55 },
    { name: "Administration", value: 25 }
];

const COLORS = ["#3276d2", "#19a46c", "#e7a43b"];

const DashboardHome = () => {

    return (
        <div className="dashboard-home">

            <div className="welcome-section">
                <div>
                    <h2>Welcome back, Administrator!</h2>
                    <p>Here's what's happening in your school today.</p>
                </div>
            </div>

            <DashboardCards />

            <div className="analytics-grid">

                <div className="analytics-card">

                    <h3>Weekly Attendance Overview</h3>

                    <div className="chart-container">

                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />

                                <Bar
                                    dataKey="present"
                                    fill="#3276d2"
                                    radius={[5, 5, 0, 0]}
                                />

                                <Bar
                                    dataKey="absent"
                                    fill="#ef7474"
                                    radius={[5, 5, 0, 0]}
                                />

                            </BarChart>
                        </ResponsiveContainer>

                    </div>

                </div>

                <div className="analytics-card">

                    <h3>Employee Distribution</h3>

                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>

                            <Pie
                                data={staffData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                label
                            >
                                {staffData.map((entry, index) => (
                                    <Cell
                                        key={entry.name}
                                        fill={COLORS[index]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />

                        </PieChart>
                    </ResponsiveContainer>

                </div>

            </div>

            <div className="bottom-grid">

                <div className="analytics-card">
                    <h3>Pending Actions</h3>

                    <div className="pending-item">
                        <span>Leave Approvals</span>
                        <strong className="pending-orange">5 Pending</strong>
                    </div>

                    <div className="pending-item">
                        <span>Attendance Corrections</span>
                        <strong className="pending-orange">8 Pending</strong>
                    </div>

                    <div className="pending-item">
                        <span>Missing Punch-out</span>
                        <strong className="pending-red">3 Alerts</strong>
                    </div>

                </div>

                <div className="analytics-card">
                    <h3>School Information</h3>

                    <p className="school-info">
                        <strong>School Name:</strong> Your School Name
                    </p>

                    <p className="school-info">
                        <strong>Academic Session:</strong> 2026–2027
                    </p>

                    <p className="school-info">
                        <strong>Management:</strong> School Administration
                    </p>

                </div>

            </div>

        </div>
    );
};

export default DashboardHome;
