import { filterFilms } from "../views/filter.js";
import { showError } from "../views/errorHandling.js";
import { searchFilms, fetchPopularFilms } from "../api.js";
import { renderFilms } from "../views/renderFilm.js";
import { loadIndicator, removeIndicator } from "../views/indicator.js";

export let allFilms = [];

export function createSearchBar(allFilms) {
    const appDiv = document.getElementById('app');

    const searchDiv = document.createElement('div');
    searchDiv.classList.add('search-div');

    const searchBar = document.createElement('input');
    searchBar.classList.add('search-bar');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search for a film...';

    searchDiv.appendChild(searchBar);
    appDiv.appendChild(searchDiv);

    searchBar.addEventListener('keyup', (event) => filterFilms(event, allFilms));
}

export async function initHomePage() {
    loadIndicator();
    try {
        const films = await fetchPopularFilms();

        if (films && films.results) {
            allFilms = films.results;
            // Calling the search bar function to be added on the page
            createSearchBar(allFilms);
            renderFilms(films);
        } else {
            console.error('No film found!');
        }    
    } catch(error) {
        console.error('Error loading films', error);
        showError('Failed to load films. Please try again later.');
    } finally {
        removeIndicator();
    }
}