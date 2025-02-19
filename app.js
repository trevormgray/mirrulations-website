let API_GATEWAY_URL;

if (import.meta.env && import.meta.env.VITE_GATEWAY_API_URL) {
    API_GATEWAY_URL = import.meta.env.VITE_GATEWAY_API_URL; // Vite (Local)
} else if (typeof GATEWAY_API_URL !== 'undefined') {
    API_GATEWAY_URL = GATEWAY_API_URL; // AWS Amplify (should be defined)
} else {
    console.error("API Gateway URL is not set. Check your environment variables.");
}

console.log("VITE_GATEWAY_API_URL:", import.meta.env.VITE_GATEWAY_API_URL);
console.log("GATEWAY_API_URL (Amplify):", typeof GATEWAY_API_URL !== 'undefined' ? GATEWAY_API_URL : "Not Set");
console.log("Resolved API_GATEWAY_URL:", API_GATEWAY_URL);

document.getElementById("search_button").addEventListener("click", search);

/**
 * Gets data for and updates the front end based on search.
 */
async function search() {
    const name = document.getElementById("search_input").value;
    const data = await getSearchData(name);
    const results_box = document.getElementById("results");
    results_box.innerHTML = ''; // Clears the results box from previous searches

    // Display all data from the API
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const result = document.createElement("p");
            const value = typeof data[key] === 'object' ? JSON.stringify(data[key], null, 2) : data[key];
            result.innerText = `${key}: ${value}`;
            results_box.appendChild(result);
        }
    }
}

/**
 * Fetches data from AWS API Gateway.
 * @param {string} name - The name to search for.
 * @returns {Object} - The search results.
 */
async function getSearchData(name) {
    if (!API_GATEWAY_URL) {
        throw new Error("API Gateway URL is not set. Check your environment variables.");
    }

    const response = await fetch(`${API_GATEWAY_URL}?name=${name}`, {
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Log the data to debug its structure
    return data;
}