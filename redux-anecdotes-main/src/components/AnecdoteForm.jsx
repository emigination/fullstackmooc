import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { addNotification, popNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    anecdoteService.createNew(event.target.anecdote.value).then(anecdote => {
      dispatch(createAnecdote(anecdote))
      dispatch(addNotification(`You added new anecdote "${anecdote.content}"`))
    })
    setTimeout(() => {
      dispatch(popNotification())
    }, 5000)
    event.target[0].value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
