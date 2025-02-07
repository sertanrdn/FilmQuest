
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

        const filmPoster = document.createElement('img');
        filmPoster.classList.add('film-poster');
        filmPoster.src = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : '';
        if (!film.poster_path) {
            filmPoster.alt = 'No poster available';
        }
        filmPoster.alt = film.title;

        const filmRating = document.createElement('p');
        filmRating.classList.add('film-rating');
        filmRating.innerText = `⭐ ${film.vote_average.toFixed(1)}/10`;

        filmTitle.appendChild(releaseYear);
        filmItem.appendChild(filmTitle);
        filmItem.appendChild(filmPoster);
        filmItem.appendChild(filmRating);
        filmList.appendChild(filmItem);
    });
    appDiv.appendChild(filmList);
}
