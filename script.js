// Récupération des éléments HTML5
const btn = document.querySelector(".btn");
const mealResult = document.querySelector(".meal__result");
const footerYear = document.querySelector(".footer__year");

// async function fetchData
const fetchData = async () => {
  await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      displayMeal(res.meals[0]); // function displayMeal(res.meals[0]) call
    })
    .catch((err) => console.error(err));
};

// Event listener and function call
btn.addEventListener("click", fetchData);

// Function displayMeal
const displayMeal = (meal) => {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    // if...else condition
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }

  // HTML structure
  const newInnerHTML = `
			<div class="meal__description">
				<img src="${meal.strMealThumb}" alt="Meal Image">
				<h4>Ingredients:</h4>
				<ol>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
				</ol>
			</div>
            <div class="column__title">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		${
      meal.strYoutube
        ? `
		<div class="meal__video">
			<h4>Video Recipe</h4>
				<iframe 
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
		</div>`
        : ""
    }
	`;

  mealResult.innerHTML = newInnerHTML;
};

// Retrieving the current date
const today = new Date();
// Retrieving the current year
const year = today.getFullYear();
console.log(year);
// Dynamic display of the year
footerYear.textContent = `${year}`;
