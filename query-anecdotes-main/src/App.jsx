import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote, getAnecdotes, voteAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote, onSuccess: () => {
    queryClient.invalidateQueries('anecdotes')
  }});

  const voteAnecdoteMutation = useMutation({ mutationFn: voteAnecdote, onSuccess: () => {
    queryClient.invalidateQueries('anecdotes')
  }});

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
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

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
