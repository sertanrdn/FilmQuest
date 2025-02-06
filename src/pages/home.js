import { filterFilms } from "../views/filter.js";
import { showError } from "../views/errorHandling.js";
import { searchFilms, fetchPopularFilms } from "../api.js";
import { renderFilms } from "../views/renderFilm.js";

export let allFilms = [];
export let popularFilms = [];

export function createSearchBar() {
    const appDiv = document.getElementById('app');

    const searchDiv = document.createElement('div');
    searchDiv.classList.add('search-div');

    const searchBar = document.createElement('input');
    searchBar.classList.add('search-bar');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search for a film...';

    searchDiv.appendChild(searchBar);
    appDiv.appendChild(searchDiv);

    let delayInterval;
    searchBar.addEventListener('keyup', (event) => {
        clearTimeout(delayInterval); // Clears the prev timer
        delayInterval = setTimeout(() => {
            filterFilms(event); // Calling filter after a delay to reduce API calls
        }, 500);
    });
}

export async function initHomePage() {
    const appDiv = document.getElementById('app');

    // Show a loading state while fetching data
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    appDiv.appendChild(spinner);

    try {
        const films = await fetchPopularFilms();

        if (films && films.results) {
            allFilms = films.results;
            popularFilms = [...films.results];
            // Calling the search bar function to be added on the page
            createSearchBar();
            renderFilms(films);
        } else {
            console.error('No film found!');
        }    
    } catch(error) {
        console.error('Error loading films', error);
        showError('Failed to load films. Please try again later.');
    } finally {
        // Remove the spinner once the data is loaded or an error occurs
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    }
}