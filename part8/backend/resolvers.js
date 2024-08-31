const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
require('dotenv').config()
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Author: {
    books: async (root) => {
      if (Object.hasOwn(root, 'books')) return root.books;
      return await Book.find({ author: root.id });
    },
  },

  Query: {
    allAuthors: async () => await Author.find({}).populate('books'),
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
      book = book.populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers
