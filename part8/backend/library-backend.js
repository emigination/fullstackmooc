const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

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
  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
  },
  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
  }
`

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
      const books = await Book.find({author: authors.map(author => author.id)})
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
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
  },
  Mutation: {
    addBook: async (_root, args) => {
      let author;
      if (args.author) {
        author = await Author.findOne({ name: args.author })
        author ||= await new Author({ name: args.author }).save()
      }
      const book = await new Book({ ...args, author: author?.id }).save();
      return book.populate('author')
    },
    editAuthor: async (_root, args) => {
      const authorToUpdate = await Author.findOne({ name: args.name })
      if (!authorToUpdate) return null
      authorToUpdate.born = args.setBornTo
      return authorToUpdate.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
