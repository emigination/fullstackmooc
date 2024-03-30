import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote, getAnecdotes, voteAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient();

  const notificationDispatch = useNotificationDispatch();
  const setNotification = (message) => {
    notificationDispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      notificationDispatch({ type: 'REMOVE', payload: message });
    }, 5000);
  }

  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote, onSuccess: (anecdote) => {
    queryClient.invalidateQueries('anecdotes')
    setNotification(`Created new anecdote '${anecdote.content}'`)
  }});

  const voteAnecdoteMutation = useMutation({ mutationFn: voteAnecdote, onSuccess: () => queryClient.invalidateQueries('anecdotes')});

  const anecdotesResult = useQuery({
    queryKey: ['anecdotes'], queryFn: getAnecdotes
  });

  if (anecdotesResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (anecdotesResult.isError) {
    return <div>Server-side error</div>;
  }

  const anecdotes = anecdotesResult.data;

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ id: anecdote.id, votes: anecdote.votes + 1 });
    setNotification(`Voted for anecdote '${anecdote.content}'`);
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} setNotification={setNotification}/>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
