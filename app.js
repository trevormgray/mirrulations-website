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
function search() {
    const data = getSearchData()
    const results_box = document.getElementById("results")
    results_box.innerHTML = '' // clears the results box from previous searches

    for (element of data) {
        const result = document.createElement("p")
        result.innerText = element.name
        results_box.appendChild(result)
    }
}

/**
 * Gets data for search from API. Currently a placeholder.
 * @returns a list of objects representing search results.
 */
function getSearchData() {
    return [
        { name: "test1" },
        { name: "test2" },
    ]
}