import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      return state.map(anecdote =>
        anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      ).sort((a, b) => b.votes - a.votes)
    },
    createAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

