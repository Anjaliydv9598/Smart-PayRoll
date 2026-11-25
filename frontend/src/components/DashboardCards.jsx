
import React from "react";
import {
    Users,
    UserCheck,
    CalendarClock,
    UserX
} from "lucide-react";

import "./DashboardCards.css";

const DashboardCards = () => {

    const cards = [
        {
            title: "Total Employees",
            value: "250",
            subtitle: "Teaching & Non-teaching",
            icon: Users,
            color: "blue"
        },
        {
            title: "Present Today",
            value: "218",
            subtitle: "87.2% attendance",
            icon: UserCheck,
            color: "green"
        },
        {
            title: "On Leave",
            value: "12",
            subtitle: "Approved leaves",
            icon: CalendarClock,
            color: "orange"
        },
        {
            title: "Absent Today",
            value: "20",
            subtitle: "Attendance records",
            icon: UserX,
            color: "red"
        }
    ];

    return (
        <div className="dashboard-cards">

            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div className="dashboard-card" key={card.title}>

                        <div className="card-top">
                            <span>{card.title}</span>

                            <div className={`card-icon ${card.color}`}>
                                <Icon size={22} />
                            </div>
                        </div>

                        <h2>{card.value}</h2>

                        <p>{card.subtitle}</p>

                    </div>
                );
            })}

        </div>
    );
};

export default DashboardCards;
