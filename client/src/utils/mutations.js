import { gql } from "@apollo/client";

//use resolvers.js file as a guide to build mutations.

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//use queries.js file as a guide to build SAVE_MOVIE and REMOVE_MOVIE
export const SAVE_MOVIE = gql`

`;

export const REMOVE_MOVIE = gql`
  mutation 
`;
