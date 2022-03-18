export const getSavedmovieIds = () => {
    const savedmovieIds = localStorage.getItem('saved_movies')
      ? JSON.parse(localStorage.getItem('saved_movies'))
      : [];
  
    return savedmovieIds;
  };
  
  export const savemovieIds = (movieIdArr) => {
    if (movieIdArr.length) {
      localStorage.setItem('saved_movies', JSON.stringify(movieIdArr));
    } else {
      localStorage.removeItem('saved_movies');
    }
  };
  
  export const removemovieId = (movieId) => {
    const savedmovieIds = localStorage.getItem('saved_movies')
      ? JSON.parse(localStorage.getItem('saved_movies'))
      : null;
  
    if (!savedmovieIds) {
      return false;
    }
  
    const updatedSavedmovieIds = savedmovieIds?.filter((savedmovieId) => savedmovieId !== movieId);
    localStorage.setItem('saved_movies', JSON.stringify(updatedSavedmovieIds));
  
    return true;
  };
  