import { renderFilms } from "./renderFilm.js";
import { getFavorites } from "../localStorage.js";

export function renderFavorites() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = '';

    const favorites = getFavorites();

    if (favorites.length === 0) {
        const message = document.createElement('div');
        message.classList.add('no-favorites');
        message.innerText = 'You have no favorite films yet!';
        appDiv.appendChild(message);
    } else {
        renderFilms({ results: favorites });
    }
}