import { renderFilms } from "./renderFilm";

export function filterFilms(event) {
    const query = event.target.value; // Get the input field value
    console.log('Query:',query);
    console.log('all films: ', allFilms);
    // Filtering the films based on the input value and showing the result by renderFilms func.
    const filteredFilms = allFilms.filter(film => {
        return film.title.toLowerCase().includes(query.toLowerCase());
    });

    console.log("Filtered films:", filteredFilms);
    
    renderFilms({ results: filteredFilms });
}