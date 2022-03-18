import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { savemovie, searchGooglemovies } from '../utils/API';
import { savemovieIds, getSavedmovieIds } from '../utils/localStorage';

const Searchmovies = () => {
  // create state for holding returned google api data
  const [searchedmovies, setSearchedmovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved movieId values
  const [savedmovieIds, setSavedmovieIds] = useState(getSavedmovieIds());

  // set up useEffect hook to save `savedmovieIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => savemovieIds(savedmovieIds);
  });

  // create method to search for movies and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGooglemovies(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const movieData = items.map((movie) => ({
        movieId: movie.id,
        authors: movie.volumeInfo.authors || ['No author to display'],
        title: movie.volumeInfo.title,
        description: movie.volumeInfo.description,
        image: movie.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedmovies(movieData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a movie to our database
  const handleSavemovie = async (movieId) => {
    // find the movie in `searchedmovies` state by the matching id
    const movieToSave = searchedmovies.find((movie) => movie.movieId === movieId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await savemovie(movieToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if movie successfully saves to user's account, save movie id to state
      setSavedmovieIds([...savedmovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for movies!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a movie'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedmovies.length
            ? `Viewing ${searchedmovies.length} results:`
            : 'Search for a movie to begin'}
        </h2>
        <CardColumns>
          {searchedmovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? (
                  <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className='small'>Authors: {movie.authors}</p>
                  <Card.Text>{movie.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedmovieIds?.some((savedmovieId) => savedmovieId === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleSavemovie(movie.movieId)}>
                      {savedmovieIds?.some((savedmovieId) => savedmovieId === movie.movieId)
                        ? 'This movie has already been saved!'
                        : 'Save this movie!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Searchmovies;
