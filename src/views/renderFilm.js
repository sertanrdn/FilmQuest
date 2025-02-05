import { filterFilms } from "./filter.js";

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

export function renderFilms(films) {
    console.log("Rendering films:", films.results);
    const appDiv = document.getElementById('app');    
    
    // Remove only the previous film list, NOT the entire appDiv
    let existingFilmList = document.querySelector('.film-list');
    if (existingFilmList) {
        existingFilmList.remove();
    }

    const filmList = document.createElement('div');
    filmList.classList.add('film-list');

    films.results.forEach(film => {
        const filmItem = document.createElement('div');
        filmItem.classList.add('film-item');

        const filmTitle = document.createElement('h3');
        filmTitle.classList.add('film-title');
        filmTitle.innerText = film.title;

        const filmPoster = document.createElement('img');
        filmPoster.classList.add('film-poster');
        filmPoster.src = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : '';
        if (!film.poster_path) {
            filmPoster.alt = 'No poster available';
        }
        filmPoster.alt = film.title;

        filmItem.appendChild(filmTitle);
        filmItem.appendChild(filmPoster);
        filmList.appendChild(filmItem);
    });
    appDiv.appendChild(filmList);
}
