import axios from 'axios'

export const createAnecdote = (content) => axios.post('http://localhost:3001/anecdotes', { content, votes: 0 }).then(response => response.data);

export const getAnecdotes = () => axios.get('http://localhost:3001/anecdotes').then(response => response.data);

export const voteAnecdote = ({id, votes}) => axios.patch(`http://localhost:3001/anecdotes/${id}`, { votes }).then(response => response.data);
