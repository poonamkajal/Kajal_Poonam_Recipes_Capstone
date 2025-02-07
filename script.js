// Recipe search
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector("#searchInput");
    const searchButton = document.querySelector("#searchButton");
    const content = document.querySelector("#content");

    // Event listener for search button
    searchButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();

        if (query !== "") {
            sendApiRequest(query);
        } else {
            content.innerHTML = ""; // Clear results if input is empty
        }
    });

    // Event listener to clear results when input is cleared
    searchInput.addEventListener("input", function () {
        if (searchInput.value.trim() === "") {
            content.innerHTML = ""; // Clear results
        }
    });
});

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
    // const content = document.querySelector("#content");
    content.innerHTML = "";

    if (data.results && data.results.length > 0) {
        let html = "";

        data.results.forEach(recipe => {
            html += `
            <div class="card" style="margin: 20px; border: 4px solid #e2d515;">
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

// Contact Page
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        let isValid = true;
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        // Validation function
        function validateField(field, errorMessage) {
            const errorElement = field.nextElementSibling;
            if (field.value.trim() === "") {
                errorElement.innerText = errorMessage;
                errorElement.style.display = "block";
                isValid = false;
            } else {
                errorElement.innerText = "";
                errorElement.style.display = "none";
            }
        }

        // Validate each field
        validateField(name, "Full name is required.");
        validateField(email, "Email is required.");
        validateField(message, "Message cannot be empty.");

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.nextElementSibling.innerText = "Enter a valid email address.";
            email.nextElementSibling.style.display = "block";
            isValid = false;
        }

        // If form is valid, show success message
        if (isValid) {
            document.getElementById("success-message").style.display = "block";
            form.reset(); // Clear form after submission
        }
    });
});