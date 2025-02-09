import { filterFilms } from "../views/filter.js";
import { showError } from "../views/errorHandling.js";
import { searchFilms, fetchPopularFilms } from "../api.js";
import { renderFilms } from "../views/renderFilm.js";
import { loadIndicator, removeIndicator } from "../views/indicator.js";
import { showFavoritesPage } from "./favorites.js";

export let allFilms = [];
export let popularFilms = [];

export function createNavbar() {
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar');

    const navList = document.createElement('ul');
    navList.classList.add('nav-list');

    const homeListItem = document.createElement('li');
    const homeLink = document.createElement('a');
    homeLink.classList.add('home-link');
    homeLink.textContent = 'Home';
    homeLink.href = '#Home';
    homeLink.addEventListener('click', () => {
        initHomePage();
    });

    const favoritesListItem = document.createElement('li');
    const favoritesLink = document.createElement('a');
    favoritesLink.classList.add('favorites-link');
    favoritesLink.textContent = 'Favorites';
    favoritesLink.href = '#Favorites';
    favoritesLink.addEventListener('click', () => {
        showFavoritesPage();
    });

    homeListItem.appendChild(homeLink);
    favoritesListItem.appendChild(favoritesLink);

    navList.appendChild(homeListItem);
    navList.appendChild(favoritesListItem);
    navbar.appendChild(navList);
    document.body.insertBefore(navbar, document.body.firstChild);
}

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
    loadIndicator();

    try {
        const films = await fetchPopularFilms();

        if (films && films.results) {
            allFilms = films.results;
            popularFilms = [...films.results];
            createNavbar();
            createSearchBar();
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