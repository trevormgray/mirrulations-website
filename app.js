const server = "https://h6aj1c0336.execute-api.us-east-1.amazonaws.com/prod";

getHello()
document.getElementById("search_button").addEventListener("click", search)

async function getHello() {
    try {
        const response = await fetch(`${server}/get_hello_world`);
        const data = await response.json();
        console.log(data);
    
        // commented out so that it doesn't add to the html.
        
        // const hello = document.createElement("h1");
        // hello.textContent = data.queryString;
        // document.body.appendChild(hello);
        
    } catch (error) {
        console.error(error);
    }
}

/**
 * Gets data for and changes front end for search.
 */
async function search() {
    const name = document.getElementById("search_input").value;
    const data = await getSearchData(name);
    const results_box = document.getElementById("results");
    results_box.innerHTML = ''; // clears the results box from previous searches

    if (Array.isArray(data)) {
        for (const element of data) {
            const result = document.createElement("p");
            result.innerText = element.name;
            results_box.appendChild(result);
        }
    } else {
        const result = document.createElement("p");
        result.innerText = data.name || "No results found";
        results_box.appendChild(result);
    }
}

/**
 * Gets data for search from AWS API Gateway.
 * @param {string} name - The name to search for.
 * @returns a list of objects representing search results.
 */
async function getSearchData(name) {
    const ApiGatewayLink = `https://1jeopqs6y0.execute-api.us-east-1.amazonaws.com/Dev/dummy?name=${name}`;
    const response = await fetch(ApiGatewayLink, {
        headers: {
            'x-api-key': 'API KEY HERE',
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