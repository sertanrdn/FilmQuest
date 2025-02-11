import { API_KEY, BASE_URL } from "./constants.js";

export async function fetchPopularFilms() {
    // Fetching the popular films to show on the Home page
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        if(!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(error){
        throw new Error(error.message);
    }
}

export async function searchFilms(query) {
    // Fetching the films if the user want to search
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        if(!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Error searching film', error);
        throw error;
    }
}