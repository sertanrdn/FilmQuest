import { fetchPopularFilms } from "./api.js";
import { renderFilms } from "./views/renderFilm.js";
import { showError } from "./views/errorHandling.js";

async function loadApp() {
    const appDiv = document.getElementById('app');

    // Show a loading state while fetching data
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    appDiv.appendChild(spinner);

    try {
        const films = await fetchPopularFilms();

        if (films && films.results) {
            renderFilms(films);
        } else {
            console.error('No film found!');
        }
        
    } catch(error) {
        console.error('Error loading films', error);
        showError('Failed to load films. Please try again later.');
    } finally {
        // Remove the spinner once the data is loaded or an error occurs
        appDiv.removeChild(spinner);
    }
}

loadApp();