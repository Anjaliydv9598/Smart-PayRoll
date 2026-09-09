const BASE_URL = "http://localhost:8080";


export async function getHolidays(year) {

    const response = await fetch(
        `${BASE_URL}/api/holidays?year=${year}`
    );

    const text = await response.text();

    let data = [];

    try {
        data = text ? JSON.parse(text) : [];
    } catch {
        throw new Error("Invalid response from server");
    }

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to load holidays"
        );
    }

    return data;
}


export async function addHoliday(holiday) {

    const response = await fetch(
        `${BASE_URL}/api/holidays`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(holiday)
        }
    );

    const text = await response.text();

    let data = {};

    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        throw new Error("Invalid response from server");
    }

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to add holiday"
        );
    }

    return data;
}


export async function updateHoliday(id, holiday) {

    const response = await fetch(
        `${BASE_URL}/api/holidays/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(holiday)
        }
    );

    const text = await response.text();

    let data = {};

    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        throw new Error("Invalid response from server");
    }

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update holiday"
        );
    }

    return data;
}


export async function deleteHoliday(id) {

    const response = await fetch(
        `${BASE_URL}/api/holidays/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {

        const text = await response.text();

        let data = {};

        try {
            data = text ? JSON.parse(text) : {};
        } catch {
            data = {};
        }

        throw new Error(
            data.message || "Failed to delete holiday"
        );
    }

    return true;
}