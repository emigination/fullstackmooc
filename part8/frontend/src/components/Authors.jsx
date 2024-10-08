import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import EditAuthor from './EditAuthor';

const Authors = (props) => {
  const allAuthorsResult = useQuery(ALL_AUTHORS, { skip: !props.show });
  if (!props.show) {
    return null
  }
  if (allAuthorsResult.loading) return <div>Loading...</div>;

  const authors = allAuthorsResult.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor show={props.show} authors={authors} />
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Authors
