import { useState } from "react";

import EmployeeSearch from "../components/EmployeeSearch";
import EmployeeTable from "../components/EmployeeTable";

function Employees() {

    const [employees, setEmployees] = useState([]);

    return (
        <div>

            <div className="page-header">

                <div>

                    <p className="small-heading">
                        EMPLOYEE MANAGEMENT
                    </p>

                    <h1>Employees 👥</h1>

                    <p>
                        Search and view employee records.
                    </p>

                </div>

                <div className="employee-total">
                    <strong>31</strong>
                    <span>Total Employees</span>
                </div>

            </div>


            <EmployeeSearch
                setEmployees={setEmployees}
            />


            <EmployeeTable
                employees={employees}
            />

        </div>
    );
}

export default Employees;