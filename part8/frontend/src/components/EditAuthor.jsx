import { useState } from 'react'
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const EditAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  if (!props.show) return null

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, setBornTo: parseInt(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Edit author</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value=''>Select author</option>
            {props.authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit' disabled={!name}>Update author</button>
      </form>
    </div>
  )
}

EditAuthor.propTypes = {
  show: PropTypes.bool.isRequired,
  authors: PropTypes.array.isRequired,
};

export default EditAuthor
