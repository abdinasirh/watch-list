// make a search to movie api
// require('dotenv').config();
// example: Example: https://api.themoviedb.org/3/movie/550?api_key
export const searchMovies = (query) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API}&query=${query}`);
  };