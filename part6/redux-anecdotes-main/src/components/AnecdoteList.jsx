import { useSelector, useDispatch } from 'react-redux';
import Filter from './Filter';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes;
    }
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter));
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    dispatch(setNotification(`You voted "${anecdotes.find(anecdote => anecdote.id === id).content}"`, 5));
  };

  return (
    <div>
      <Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;
