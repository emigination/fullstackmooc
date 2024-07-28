const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
require('dotenv').config()
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
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
  }
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
  }
`

const jwt = require('jsonwebtoken')

const resolvers = {
  Author: {
    bookCount: async (root) => {
      if (Object.hasOwn(root, 'bookCount')) return root.bookCount
      return await Book.where('author', root.id).countDocuments()
    },
  },

  Query: {
    allAuthors: async () => {
      let authors = await Author.find({})
      const books = await Book.find({ author: authors.map(author => author.id) })
      const bookCountsByAuthorId = books.reduce((acc, book) => {
        const authorId = book.author.toString()
        acc[authorId] = acc[authorId] ? acc[authorId] + 1 : 1
        return acc
      }, {})
      authors = authors.map(author => {
        const bookCount = bookCountsByAuthorId[author.id.toString()] || 0
        return { ...author._doc, bookCount }
      })
      return authors
    },
    allBooks: async (_root, { author, genre }) => {
      let queryParams = {};
      if (author) {
        const authorObject = await Author.findOne({ name: author })
        queryParams.author = authorObject?.id
      }
      if (genre) queryParams.genres = genre
      const books = await Book.find(queryParams).populate('author')
      return books
    },
    allGenres: async () => {
      const books = await Book.find({})
      return Array.from(new Set(books.flatMap(book => book.genres))).filter(genre => genre).sort()
    },
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    me: (_root, _args, { currentUser }) => currentUser
  },

  Mutation: {
    addBook: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not logged in', { extensions: { code: 'BAD_USER_INPUT' } })
      }
      let author;
      if (args.author) {
        author = await Author.findOne({ name: args.author })
        if (!author) {
          try {
            author = await new Author({ name: args.author }).save()
          } catch (error) {
            throw new GraphQLError('Failed to create author', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          }
        }
      }
      let book;
      try {
        book = await new Book({ ...args, author: author?.id }).save()
      } catch (error) {
        throw new GraphQLError('Failed to create book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
      return book.populate('author')
    },
    createUser: async (_root, args) => {
      const user = new User({ ...args })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Failed to create user', {
            extensions: { code: 'BAD_USER_INPUT', invalidArgs: args, error }
          })
        })
    },
    editAuthor: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not logged in', { extensions: { code: 'BAD_USER_INPUT' } })
      }
      const authorToUpdate = await Author.findOne({ name: args.name })
      if (!authorToUpdate) return null
      authorToUpdate.born = args.setBornTo
      return authorToUpdate.save()
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'dummyPW') {
        throw new GraphQLError('Wrong credentials', { extensions: { code: 'BAD_USER_INPUT' } })
      }
      const userForToken = { username: user.username, id: user._id }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req?.headers?.authorization
    if (auth?.startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
