import { useState } from 'react'
import './App.css'

function App() {

  const [search, setSearch] = useState('')
  const [employees, setEmployees] = useState([])

  const handleSearch = async () => {

    if (!search.trim()) {
      alert("Please enter Employee ID, Name or Date")
      return
    }

    try {

      const response = await fetch(
          `http://localhost:8080/employees/search?empIds=${search}`
      )

      if (!response.ok) {
        const error = await response.json()
        alert(error.message)
        return
      }

      const data = await response.json()

      setEmployees(data)

    } catch (error) {

      alert("Unable to connect to Spring Boot")

    }
  }

  return (
      <div className="app">

        <h1>Smart Payroll</h1>

        <div className="search-box">

          <input
              type="text"
              placeholder="Enter Employee ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search
          </button>

        </div>

        <div className="results">

          {employees.map((employee) => (

              <div key={employee.empId}>

                <h2>{employee.name}</h2>

                <p>Employee ID: {employee.empId}</p>
                <p>Email: {employee.emailId}</p>
                <p>Phone: {employee.phoneNo}</p>
                <p>Role: {employee.role}</p>

              </div>

          ))}

        </div>

      </div>
  )
}

export default App