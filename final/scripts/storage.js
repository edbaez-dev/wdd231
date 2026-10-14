const storageKey = "favoriteRecipes";

export function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch (error) {
        console.error("Could not read favorites:", error);
        return [];
    }
}

export function toggleFavorite(id) {
    const favorites = getFavorites();
    const updated = favorites.includes(id)
        ? favorites.filter((favoriteId) => favoriteId !== id)
        : [...favorites, id];

    localStorage.setItem(storageKey, JSON.stringify(updated));
    return updated;
}