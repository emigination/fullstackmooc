import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
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
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

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
