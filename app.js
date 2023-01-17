function displayCategoriesAndMeals() {
    // Get all categories from the API
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((response) => response.json())
        .then((data) => {
            // Create a select element to display categories
            const select = document.createElement("select");
            select.id = "categories";

            // Add an option for each category
            data.categories.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.strCategory;
                option.text = category.strCategory;
                select.appendChild(option);
            });
            select.options[select.selectedIndex].text = "Lamb";
            // Add an event listener to the select element to display meals when a category is selected
            select.addEventListener("change", (event) => {
                // Get the selected category
                const selectedCategory = event.target.value;
                displayMeals(selectedCategory);
            });

            // Add the select element to the page
            document.body.appendChild(select);

            // Display the meals for the "Lamb" category when the page loads
            displayMeals("Lamb");
        });
}

function displayMeals(category) {
    // Get all meals in the selected category from the API
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((data) => {
            // Remove the previous meals container
            const previousContainer = document.getElementById("meals-container");
            if (previousContainer) {
                previousContainer.remove();
            }

            // Create a container to display meals
            const container = document.createElement("div");
            container.id = "meals-container";
            container.classList.add("row");

            // Add a card for each meal
            data.meals.forEach((meal) => {
                const card = document.createElement("div");
                card.classList.add("col-12", "col-md-4", "mb-3");

                const cardBody = document.createElement("div");
                cardBody.classList.add("card");

                const cardImg = document.createElement("img");
                cardImg.classList.add("card-img-top");
                cardImg.src = meal.strMealThumb;
                cardBody.appendChild(cardImg);

                const cardTitle = document.createElement("h5");
                cardTitle.classList.add("card-title");

                cardTitle.textContent = meal.strMeal;
                cardBody.appendChild(cardTitle);

                card.appendChild(cardBody);
                container.appendChild(card);
            });

            document.body.appendChild(container);
        });
}
function displayMealsByRegion() {
    // Get all regions from the API
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        .then((response) => response.json())
        .then((data) => {
            // Create a select element to display regions
            const select = document.createElement("select");
            select.id = "regions";

            // Add an option for each region
            data.meals.forEach((region) => {
                const option = document.createElement("option");
                option.value = region.strArea;
                option.text = region.strArea;
                select.appendChild(option);
            });
            // Add an event listener to the select element to display meals when a region is selected
            select.addEventListener("change", (event) => {
                // Get the selected region
                const selectedRegion = event.target.value;

                // Get all meals in the selected region from the API
                fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedRegion}`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        // Remove the previous meals container
                        const previousContainer =
                            document.getElementById("meals-container");
                        if (previousContainer) {
                            previousContainer.remove();
                        }

                        // Create a container to display meals
                        const container = document.createElement("div");
                        container.id = "meals-container";
                        container.classList.add("row");

                        // Add a card for each meal
                        data.meals.forEach((meal) => {
                            container.innerHTML += `
                                <div class="col-12 col-md-4 mb-3">
                                    <div class="card">
                                        <img class="card-img-top" src="${meal.strMealThumb}">
                                        <h5 class="card-title">${meal.strMeal}</h5>
                                    </div>
                                </div>
                            `;
                        });
                        document.body.appendChild(container);
                    });
            });
            // Add the select element to the page
            document.body.appendChild(select);
            //Set the default option text to "Morocco"
            select.options[select.selectedIndex].text = "Morocco";
        });
}

displayMealsByRegion();
displayCategoriesAndMeals();
