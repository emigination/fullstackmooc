const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    books: [Book!]!
  },
  type Book {
    title: String!
    published: Int
    author: Author
    genres: [String!]
    id: ID!
  },
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  },
  type Token {
    value: String!
  },

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]!
    authorCount: Int!
    bookCount: Int!
    me: User
  },

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String
      genres: [String]
    ): Book
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    login(
      username: String!
      password: String!
    ): Token
  },

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs
