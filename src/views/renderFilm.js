export function renderFilms(films) {
    const appDiv = document.getElementById('app');    
    appDiv.innerHTML = '';

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