// make a search to movie api
// example: Example: https://api.themoviedb.org/3/movie/550?api_key=fa5a36087590a648d382b06f3ec325df
export const searchMovies = (query) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?q=${query}`);
  };