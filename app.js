const server = "https://h6aj1c0336.execute-api.us-east-1.amazonaws.com/prod";

getHello()

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