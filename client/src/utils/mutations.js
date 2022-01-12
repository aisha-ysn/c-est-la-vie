import {gql} from '@apollo/client';

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
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        username
        _id
        email
      }
    }
  }
`;

export const SAVE_ENTRIES = gql`
  mutation saveEntries($input: saveEntries) {
    saveEntries(input: $input) {
      _id
      username
      savedEntries {
        entriesId
        title
        content
        timeStamp
        userId
      }
    }
  }
`;

export const REMOVE_ENTRIES = gql`
  mutation removeEntries($entriesId: String!) {
    removeEntries(entriesId: $entriesId) {
      username
      savedEntries {
        entriesId
        title
        content
        timeStamp
        userId
      }
    }
  }
`;

