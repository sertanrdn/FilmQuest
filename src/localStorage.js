export function addFavorites(film) {
    const favorites = JSON.parse(localStorage.getItem('favorite')) || [];

    const isExist = favorites.some(favoriteFilm => favoriteFilm.id === film.id);

    if (!isExist) {
        favorites.push(film);

        localStorage.setItem('favorite', JSON.stringify(favorites));
    }
}

export function removeFavorites(film) {
    const favorites = JSON.parse(localStorage.getItem('favorite')) || [];

    const updateFavorites = favorites.filter(favoriteFilm => favoriteFilm.id !== film.id);

    localStorage.setItem('favorite', JSON.stringify(updateFavorites));
}

export function getFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorite')) || [];

    return favorites;
}