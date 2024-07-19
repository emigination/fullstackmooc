import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    dispatch(createNewAnecdote(event.target.anecdote.value));
    dispatch(setNotification(`You added new anecdote "${event.target.anecdote.value}"`, 5));
    event.target[0].value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
