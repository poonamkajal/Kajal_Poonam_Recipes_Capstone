let searchButton = document.querySelector("#search")
//Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log("button pressed");
    let keyword = document.querySelector("#searchInput").value;
    sendApiRequest(keyword);
})

async function sendApiRequest(keyword = "") {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4a34bfe78c07490d8ad03d99a72ae206`);
        console.log(response);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log("Original Data:", data);

        // Filter recipes based on keyword in title
        let filteredResults = data.results.filter(recipe => 
            recipe.title.toLowerCase().includes(keyword.toLowerCase())
        );

        console.log("Filtered Data:", filteredResults);
        useApiData({ results: filteredResults });
    } 
    catch (error) {
        console.error("Error fetching data:", error);
        document.querySelector("#content").innerHTML = "<p>Failed to fetch recipes. Please try again later.</p>";
    }
}

function useApiData(data) {
    const content = document.querySelector("#content");
    content.innerHTML = "";

    if (data.results && data.results.length > 0) {
        let html = "";

        data.results.forEach(recipe => {
            html += `
            <div class="card" style="margin: 20px;">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                </div>
            </div>`;
        });

        content.innerHTML = html;
    } else {
        content.innerHTML = "<p>No recipes found.</p>";
    }
}

