const apiKey = '7886a497fe1f21745fa51eeacb2c0a7c';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

export async function fetchFilms() {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        throw new Error(error.message);
    }
}