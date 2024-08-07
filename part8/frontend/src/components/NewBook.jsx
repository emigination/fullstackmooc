import { useState } from 'react'
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from '../queries';

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [addBook] = useMutation(ADD_BOOK, {refetchQueries: [
    { query: ALL_AUTHORS }, { query: ALL_BOOKS }, { query: ALL_BOOKS, variables: { genre: '' } },
    ...(genres.map(g => ( { query: ALL_BOOKS, variables: { genre: g } }))),
    { query: ALL_GENRES }
  ] })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    addBook({ variables: { title, author, published: parseInt(published), genres } })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            name='published'
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            name='genre'
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

NewBook.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default NewBook
