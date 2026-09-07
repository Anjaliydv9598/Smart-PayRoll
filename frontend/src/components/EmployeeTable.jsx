function EmployeeTable({ employees }) {

    if (employees.length === 0) {
        return (
            <div className="empty-state">

                <div className="empty-icon">
                    👥
                </div>

                <h3>No employees to display</h3>

                <p>
                    Use the search above to find employee records.
                </p>

            </div>
        );
    }

    return (
        <div className="employee-table-card">

            <div className="table-header">
                <div>
                    <p className="small-heading">
                        EMPLOYEE RECORDS
                    </p>

                    <h2>
                        Search Results
                    </h2>
                </div>

                <span className="result-count">
          {employees.length} record
                    {employees.length !== 1 ? "s" : ""}
        </span>
            </div>


            <div className="table-wrapper">

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

                    {employees.map((employee) => (

                        <tr key={employee.empId}>

                            <td>
                                <strong className="employee-id">
                                    {employee.empId}
                                </strong>
                            </td>

                            <td>
                                <strong>
                                    {employee.name}
                                </strong>
                            </td>

                            <td>
                  <span className="role-badge">
                    {employee.role}
                  </span>
                            </td>

                            <td>
                                {employee.emailId}
                            </td>

                            <td>
                                {employee.phoneNo}
                            </td>

                            <td>
                                {employee.joiningDate}
                            </td>

                            <td>
                                ₹{employee.basic?.toLocaleString("en-IN")}
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default EmployeeTable;