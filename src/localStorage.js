import { LOCAL_STORAGE_KEY } from "./constants.js";

export function addFavorites(film) {
    const favorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    const isExist = favorites.some(favoriteFilm => favoriteFilm.id === film.id);

    // If doesn't exist in the list adding to the favorites and updating the local storage
    if (!isExist) {
        favorites.push(film);

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
    }
}

export function removeFavorites(film) {
    // Removing the film from favorites and updating the local storage
    const favorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    const updateFavorites = favorites.filter(favoriteFilm => favoriteFilm.id !== film.id);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateFavorites));
}

export function getFavorites() {
    // Getting the current favorites
    const favorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    return favorites;
}