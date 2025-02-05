import { API_GATEWAY_LINK } from './config.js';

const server = API_GATEWAY_LINK;

document.getElementById("search_button").addEventListener("click", search);

/**
 * Gets data for and changes front end for search.
 */
async function search() {
    const name = document.getElementById("search_input").value;
    const data = await getSearchData(name);
    const results_box = document.getElementById("results");
    results_box.innerHTML = ''; // clears the results box from previous searches

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
 * Gets data for search from AWS API Gateway.
 * @param {string} name - The name to search for.
 * @returns an object representing search results.
 */
async function getSearchData(name) {
    const ApiGatewayLink = `https://1jeopqs6y0.execute-api.us-east-1.amazonaws.com/Dev/dummy?name=${name}`;
    const response = await fetch(ApiGatewayLink, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data); // Log the data to see its structure
    return data;
}