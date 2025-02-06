import { renderFilms } from "./renderFilm.js";
import { searchFilms } from "../api.js";
import { showError } from "./errorHandling.js";
import { allFilms, popularFilms } from "../pages/home.js";

export async function filterFilms(event) {
    const query = event.target.value.trim().toLowerCase(); // Get the input field value

    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    if(query === '') {
        // If the search bar is empty show popular films again
        renderFilms({ results: popularFilms });
        return;
    }

    const filmList = document.querySelector('.film-list');
    if (filmList) {
        filmList.remove();
    }

    const filteredFilms = allFilms.filter(film => 
        film.title.toLowerCase().includes(query)
    );

    if (filteredFilms.length > 0) {
        renderFilms({ results: filteredFilms});
        return;
    }
    // Otherwise we will get the searchFilms API call based on the input
    try {
        const searchResults = await searchFilms(query);
        
        if (searchResults.results && searchResults.results.length === 0) {
            showError('No film found, please try another film!');
        } else {
            allFilms.length = 0;
            allFilms.push(...searchResults.results)
            renderFilms({ results: searchResults.results });
        }
    } catch(error) {
        console.error('Error searching films:', error);
    }
}