import { renderFilms } from "./renderFilm.js";
import { getFavorites, removeFavorites } from "../localStorage.js";
import { LOCAL_STORAGE_KEY } from "../constants.js";

export function renderFavorites() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = '';

    const favorites = getFavorites();

    // If there is no favorites display a message 
    if (favorites.length === 0) {
        const message = document.createElement('div');
        message.classList.add('no-favorites');
        message.innerText = 'You have no favorite films yet!';
        appDiv.appendChild(message);
    } else {
        renderFilms({ results: favorites });
    }

    // Selecting the films with heart icon and adding event listener
    document.querySelectorAll('.film-item .fa-heart').forEach((heartIcon) => {
        heartIcon.addEventListener('click', () => {
            const favorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
           
            // Finding the favorite film to remove by its ID
            const filmId = heartIcon.dataset.id;
            const filmToRemove = favorites.find(fav => fav.id === filmId);
            if (filmToRemove) {
                removeFavorites(filmToRemove);
            }
            heartIcon.closest('.film-item').remove();

            // Checking the remaining favorites
            const remainingFavorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
            if (remainingFavorites.length === 0) {
                appDiv.innerHTML = `<div class="no-favorites">You have no favorite films yet!</div>`;
            }
        });
    });
}