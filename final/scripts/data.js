const recipesUrl = "data/recipes.json";

export async function getRecipes() {
    try {
        const response = await fetch(recipesUrl);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not load recipes:", error);
        return [];
    }
}