import { gql } from '@apollo/client';

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
  mutation addUser($username: String!, $email: String!, $password: String!,) {
    addUser(username: $username,email: $email, password: $password,) {
      token
      user {
        username
        _id
      }
    }
  }
`;

export const SAVE_ENTRIES = gql`
  mutation saveEntries($input:  EntriesInput!) {
    saveEntries(input: $input) {
      _id
      username
      savedEntries {
        EntriesId
        title
        content
        timeStamp
        userId
      }
    }
  }
`;

export const REMOVE_ENTRIES = gql`
  mutation removeEntries($EntriesId: String!) {
    removeEntries(EntriesId: $EntriesId) {
      username
      savedEntries {
        EntriesId
        title
        content
        timeStamp
        userId
      }
    }
  }
`;

