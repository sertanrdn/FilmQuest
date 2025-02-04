import { fetchFilms } from "./api.js";
import { renderFilms } from "./views/renderFilm.js";

async function loadApp() {
    try {
        const films = await fetchFilms();

        if (films && films.results) {
            renderFilms(films);
        } else {
            console.error('No film found!');
        }
        
    } catch(error) {
        console.error('Error loading films', error);
    }
}

loadApp();