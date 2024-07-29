import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../queries';
import BookList from './BookList';

const Recommendations = (props) => {
  const userResult = useQuery(CURRENT_USER, { skip: !props.show });
  if (!props.show) return null
  if (userResult.loading) return <div>Loading...</div>;

  const genre = userResult.data.me.favoriteGenre
  return (
    <div>
      <h2>recommendations</h2>

      <div>
        Books in your favourite genre <b>{genre}</b>
      </div>
      <BookList show={props.show} genre={genre}/>
    </div>
  )
}

Recommendations.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Recommendations
