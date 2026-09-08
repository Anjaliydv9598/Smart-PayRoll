import { useState } from "react";
import { searchEmployees } from "../services/employeeService";

function EmployeeSearch({ setEmployees }) {

    const [searchType, setSearchType] =
        useState("Employee ID");

    const [searchValue, setSearchValue] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSearch = async () => {

        if (!searchValue.trim()) {
            alert("Please enter a search value.");
            return;
        }

        try {

            setLoading(true);

            const data = await searchEmployees(
                searchType,
                searchValue
            );

            setEmployees(data);

        } catch (error) {

            setEmployees([]);

            alert(error.message);

        } finally {

            setLoading(false);

        }
    };

    const getPlaceholder = () => {

        switch (searchType) {

            case "Employee ID":
                return "Example: T001 or T001,T002";

            case "Name":
                return "Example: Amrita";

            case "Joining Date":
                return "Example: 2024-07-01";

            case "Leaving Date":
                return "Example: 2025-01-01";

            default:
                return "Search employee";
        }
    };

    return (
        <div className="employee-search">

            <div className="search-type">

                <label>Search By</label>

                <select
                    value={searchType}
                    onChange={(e) =>
                        setSearchType(e.target.value)
                    }
                >
                    <option>Employee ID</option>
                    <option>Name</option>
                    <option>Joining Date</option>
                    <option>Leaving Date</option>
                </select>

            </div>

            <div className="search-input">

                <label>Search Employee</label>

                <input
                    type={
                        searchType.includes("Date")
                            ? "date"
                            : "text"
                    }
                    placeholder={getPlaceholder()}
                    value={searchValue}
                    onChange={(e) =>
                        setSearchValue(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />

            </div>

            <button
                className="search-button"
                onClick={handleSearch}
                disabled={loading}
            >
                {loading ? "Searching..." : "🔍 Search"}
            </button>

        </div>
    );
}

export default EmployeeSearch;