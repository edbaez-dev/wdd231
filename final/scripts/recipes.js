import { getRecipes } from "./data.js";
import { getFavorites, toggleFavorite } from "./storage.js";

const recipeList = document.querySelector("#recipe-list");
const savedToggle = document.querySelector("#saved-toggle");
const modal = document.querySelector("#recipe-modal");
const modalTitle = document.querySelector("#modal-title");
const modalIngredients = document.querySelector("#modal-ingredients");
const modalClose = document.querySelector("#modal-close");

const errorMessage = "Recipes could not be loaded. Please try again later.";
const noSavedMessage = "You have no saved recipes yet.";

let recipes = [];
let showSavedOnly = false;

function displayRecipes(recipeData, emptyMessage) {
    if (recipeData.length === 0) {
        recipeList.textContent = emptyMessage;
        return;
    }

    const favorites = getFavorites();

    recipeList.innerHTML = recipeData
        .map((recipe) => {
            const isFavorite = favorites.includes(recipe.id);
            return `
        <article class="recipe-card">
            <img src="images/${recipe.image}" alt="${recipe.name}" width="400" height="300" loading="lazy">
            <h2>${recipe.name}</h2>
            <p>Region: ${recipe.region}</p>
            <p>Time: ${recipe.prepTime} min</p>
            <p>Difficulty: ${recipe.difficulty}</p>
            <button type="button" data-id="${recipe.id}" aria-label="View details of ${recipe.name}">View details</button>
            <button type="button" class="favorite-button" data-favorite-id="${recipe.id}" aria-pressed="${isFavorite}" aria-label="Save ${recipe.name} as favorite">${isFavorite ? "Saved" : "Save"}</button>
        </article>`;
        })
        .join("");
}

function updateView() {
    if (showSavedOnly) {
        const favorites = getFavorites();
        const savedRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));
        displayRecipes(savedRecipes, noSavedMessage);
    } else {
        displayRecipes(recipes, errorMessage);
    }
}

function openModal(recipe) {
    modalTitle.textContent = recipe.name;
    modalIngredients.innerHTML = recipe.ingredients
        .map((ingredient) => `<li>${ingredient}</li>`)
        .join("");
    modal.showModal();
}

savedToggle.addEventListener("click", () => {
    showSavedOnly = !showSavedOnly;
    savedToggle.textContent = showSavedOnly ? "Show all recipes" : "Show saved recipes";
    updateView();
});

recipeList.addEventListener("click", (event) => {
    const detailsButton = event.target.closest("button[data-id]");
    if (detailsButton) {
        const recipe = recipes.find((item) => item.id === Number(detailsButton.dataset.id));
        openModal(recipe);
        return;
    }

    const favoriteButton = event.target.closest("button[data-favorite-id]");
    if (favoriteButton) {
        const id = Number(favoriteButton.dataset.favoriteId);
        const isFavorite = toggleFavorite(id).includes(id);

        if (showSavedOnly && !isFavorite) {
            favoriteButton.closest(".recipe-card").remove();
            if (recipeList.children.length === 0) {
                recipeList.textContent = noSavedMessage;
            }
            savedToggle.focus();
            return;
        }

        favoriteButton.textContent = isFavorite ? "Saved" : "Save";
        favoriteButton.setAttribute("aria-pressed", isFavorite);
    }
});

modalClose.addEventListener("click", () => {
    modal.close();
});

async function init() {
    recipes = await getRecipes();
    updateView();
}

init();