import { gql } from '@apollo/client'

const BOOK_BASIC_INFO = gql`
  fragment BookBasicInfo on Book {
    title
    author {
      name
    }
    published
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      books {
        id
      }
    }
  }
`

export const ALL_BOOKS = gql`
  query($genre: String) {
    allBooks(genre: $genre) {
      ...BookBasicInfo
    }
  }
  ${BOOK_BASIC_INFO}
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String, $published: Int, $genres: [String!]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      ...BookBasicInfo
    }
  }
  ${BOOK_BASIC_INFO}
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookBasicInfo
      genres
    }
  }
  ${BOOK_BASIC_INFO}
`

export const CURRENT_USER = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOG_IN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
