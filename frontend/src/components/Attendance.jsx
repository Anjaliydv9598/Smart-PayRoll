import React, { useState } from "react";

function Attendance() {

    // Get today's date from the computer
    const today = new Date();

    const currentDate =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

    const [date, setDate] = useState(currentDate);

    return (
        <div>
            <h2>Attendance</h2>

            <label>Attendance Date: </label>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <p>Selected Date: {date}</p>
        </div>
    );
}

export default Attendance;