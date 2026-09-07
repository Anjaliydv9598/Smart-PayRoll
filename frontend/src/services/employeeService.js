const BASE_URL = "http://localhost:8080";

export async function searchEmployees(searchType, searchValue) {

    let parameter;

    switch (searchType) {

        case "Employee ID":
            parameter = `empIds=${encodeURIComponent(searchValue)}`;
            break;

        case "Name":
            parameter = `name=${encodeURIComponent(searchValue)}`;
            break;

        case "Joining Date":
            parameter = `joiningDate=${encodeURIComponent(searchValue)}`;
            break;

        case "Leaving Date":
            parameter = `leavingDate=${encodeURIComponent(searchValue)}`;
            break;

        default:
            throw new Error("Invalid search type");
    }

    const response = await fetch(
        `${BASE_URL}/employees/search?${parameter}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Employee not found"
        );
    }

    return data;
}