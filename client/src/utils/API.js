// make a search to movie api
// example: Example: https://api.themoviedb.org/3/movie/550?api_key=
export const searchMovies = (query) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?q=${query}`);
  };