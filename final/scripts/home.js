import { getRecipes } from "./data.js";

const featuredList = document.querySelector("#featured-recipes");

async function init() {
    const recipes = await getRecipes();

    if (recipes.length === 0) {
        featuredList.textContent = "Featured recipes could not be loaded. Please try again later.";
        return;
    }

    featuredList.innerHTML = recipes
        .slice(0, 3)
        .map(
            (recipe) => `
        <article class="recipe-card">
            <img src="images/${recipe.image}" alt="${recipe.name}" width="400" height="300" loading="lazy">
            <h3>${recipe.name}</h3>
            <p>Time: ${recipe.prepTime} min</p>
            <p>Difficulty: ${recipe.difficulty}</p>
        </article>`
        )
        .join("");
}

init();