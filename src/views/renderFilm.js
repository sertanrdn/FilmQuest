import { addFavorites, removeFavorites } from "../localStorage.js";

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

        const releaseYear = document.createElement('span');
        releaseYear.classList.add('release-year');
        releaseYear.innerText = `(${film.release_date.slice(0, 4)})`;

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        const filmPoster = document.createElement('img');
        filmPoster.classList.add('film-poster');
        filmPoster.src = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : '';
        if (!film.poster_path) {
            filmPoster.alt = 'No poster available';
        }
        filmPoster.alt = film.title;

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-regular', 'fa-heart');
        heartIcon.dataset.id = film.id;

        const favorites = JSON.parse(localStorage.getItem('favorite')) || [];
        if (favorites.some(favoriteFilm => favoriteFilm.id === film.id)) {
            heartIcon.classList.add('fa-solid', 'fa-heart', 'favorite');
        } else {
            heartIcon.classList.add('fa-regular', 'fa-heart');
        }

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

            console.log("Current Favorites:", JSON.parse(localStorage.getItem('favorite')));
        });

        const filmRating = document.createElement('p');
        filmRating.classList.add('film-rating');
        filmRating.innerText = `⭐ ${film.vote_average.toFixed(1)}/10`;

        filmTitle.appendChild(releaseYear);
        filmItem.appendChild(filmTitle);
        filmItem.appendChild(imageWrapper);
        filmItem.appendChild(filmRating);
        imageWrapper.appendChild(heartIcon);
        imageWrapper.appendChild(filmPoster)
        filmList.appendChild(filmItem);
    });
    appDiv.appendChild(filmList);
}
