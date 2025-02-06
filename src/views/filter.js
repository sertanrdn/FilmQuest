import { renderFilms } from "./renderFilm.js";
import { searchFilms } from "../api.js";
import { showError } from "./errorHandling.js";

export async function filterFilms(event, allFilms) {
    const query = event.target.value.trim(); // Get the input field value
    console.log('Query:',query);
    console.log('all films: ', allFilms);

    if(query === '') {
        // If the search bar is empty show popular films
        renderFilms({ results: allFilms });
        return;
    }
    // Otherwise we will get the searchFilms API call based on the input
    try {
        const searchResults = await searchFilms(query);
        console.log('Search Results: ', searchResults);
        renderFilms(searchResults);
    } catch(error) {
        console.error('Error searching films:', error);
    }
}