import { renderFilms } from "./renderFilm.js";
import { getFavorites, removeFavorites } from "../localStorage";

export function renderFavorites() {
    const favorites = getFavorites();

    // If there is no favorites display a message 
    if (favorites.length === 0) {
        const appDiv = document.getElementById('app');
        const message = document.createElement('div');
        message.innerText = 'You have no favorite films yet!';
        appDiv.appendChild(message);
    } else {
        renderFilms({ results: favorites });
    }

    // Selecting the films with heart icon and adding event listener
    document.querySelectorAll('.film-item .fa-heart').forEach((heartIcon) => {
        heartIcon.addEventListener('click', () => {
            const favorites = JSON.parse(localStorage.getItem('favorite')) || [];
           
            // Finding the favorite film to remove by its ID
            const filmId = heartIcon.dataset.id;
            const filmToRemove = favorites.find(fav => fav.id === filmId);
            if (filmToRemove) {
                removeFavorites(filmToRemove);
            }
            heartIcon.closest('.film-item').remove();

            // Checking the remaining favorites
            const remainingFavorites = JSON.parse(localStorage.getItem('favorite')) || [];
            if (remainingFavorites.length === 0) {
                appDiv.innerHTML = `<div class="no-favorites">You have no favorite films yet!</div>`;
            }
        });
    });
}