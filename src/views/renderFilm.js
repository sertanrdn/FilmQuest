import { addFavorites, removeFavorites } from "../localStorage.js";
import { IMAGE_URL, LOCAL_STORAGE_KEY } from "../constants.js";

export function renderFilms(films) {
    const appDiv = document.getElementById('app');    
    
    // Remove only the previous film list, NOT the entire appDiv
    let existingFilmList = document.querySelector('.film-list');
    if (existingFilmList) {
        existingFilmList.remove();
    }

    const filmList = document.createElement('div');
    filmList.classList.add('film-list');

    // Creating the DOM elements for film cards
    films.results.forEach(film => {
        const filmItem = document.createElement('div');
        filmItem.classList.add('film-item');

        const filmTitle = document.createElement('h3');
        filmTitle.classList.add('film-title');
        filmTitle.innerText = film.title;

        const releaseYear = document.createElement('span');
        releaseYear.classList.add('release-year');
        releaseYear.innerText = `(${film.release_date.slice(0, 4)})`;

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        const filmPoster = document.createElement('img');
        filmPoster.classList.add('film-poster');
        filmPoster.src = film.poster_path ? `${IMAGE_URL}${film.poster_path}` : '';
        if (!film.poster_path) {
            filmPoster.alt = 'No poster available';
        }
        filmPoster.alt = film.title;

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-regular', 'fa-heart');
        heartIcon.dataset.id = film.id;

        // Switching the icons look based on the favorite
        const favorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        if (favorites.some(favoriteFilm => favoriteFilm.id === film.id)) {
            heartIcon.classList.add('fa-solid', 'fa-heart', 'favorite');
        } else {
            heartIcon.classList.add('fa-regular', 'fa-heart');
        }

        // Adding event listener to the icons 
        heartIcon.addEventListener('click', () => {
            if (heartIcon.classList.contains('favorite')) {
                heartIcon.classList.remove('favorite', 'fa-solid');
                heartIcon.classList.add('fa-regular');
                removeFavorites(film);
            } else {
                heartIcon.classList.add('favorite', 'fa-solid');
                heartIcon.classList.remove('fa-regular');
                addFavorites(film);
            }
        });

        const filmRating = document.createElement('p');
        filmRating.classList.add('film-rating');
        filmRating.innerText = `⭐ ${film.vote_average.toFixed(1)}/10`;

        const readMoreButton = document.createElement('button');
        readMoreButton.classList.add('read-more');
        readMoreButton.innerText = 'Read More';

        const filmPlot = document.createElement('p');
        filmPlot.classList.add('film-plot', 'hidden');
        filmPlot.innerText = film.overview;

        // Adding event listener to button
        readMoreButton.addEventListener('click', () => {
            if (filmPlot.classList.contains('hidden')) {
                filmPlot.classList.remove('hidden');
                filmPlot.classList.add('visible');
                readMoreButton.innerText = 'Show Less';
            } else {
                filmPlot.classList.remove('visible');
                filmPlot.classList.add('hidden');
                readMoreButton.innerText = 'Read More';
            }
        });

        // Appending the elements to the correct HTML 
        filmTitle.appendChild(releaseYear);
        filmItem.appendChild(filmTitle);
        filmItem.appendChild(imageWrapper);
        filmItem.appendChild(filmRating);
        imageWrapper.appendChild(heartIcon);
        imageWrapper.appendChild(filmPoster);
        filmItem.appendChild(readMoreButton);
        filmItem.appendChild(filmPlot);
        filmList.appendChild(filmItem);
    });
    appDiv.appendChild(filmList);
}
