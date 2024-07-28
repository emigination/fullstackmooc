import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const BookList = forwardRef((props, ref) => {
  const [genre, setGenre] = useState('')
  useImperativeHandle(ref, () => ({ setGenre }));

  const booksResult = useQuery(ALL_BOOKS, { variables: { genre }, skip: !props.show });
  if (!props.show) return null
  if (booksResult.loading) return <div>Loading...</div>;

  const books = booksResult.data.allBooks;

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author?.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
})

BookList.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default BookList
