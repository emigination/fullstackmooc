import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { ALL_GENRES } from '../queries';
import BookList from './BookList';

const Books = (props) => {
  const allGenresResult = useQuery(ALL_GENRES, { skip: !props.show });
  const bookListRef = useRef()

  if (!props.show) {
    return null
  }
  if (allGenresResult.loading) return <div>Loading...</div>;

  const genres = allGenresResult.data.allGenres;

  return (
    <div>
      <h2>books</h2>

      <div>
        Filter by genre:
        <select onChange={({ target }) => bookListRef.current.setGenre(target.value)}>
          <option value=''>Select genre</option>
          {genres.map((genre) => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <BookList show={props.show} genre={''} ref={bookListRef}/>
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Books
