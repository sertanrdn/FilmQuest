import { renderFilms } from "./renderFilm.js";
import { getFavorites } from "../localStorage";

export function renderFavorites() {
    const favorites = getFavorites();

    if (favorites.length === 0) {
        const appDiv = document.getElementById('app');
        const message = document.createElement('div');
        message.innerText = 'You have no favorite films yet!';
        appDiv.appendChild(message);
    } else {
        renderFilms({ results: favorites });
    }
}