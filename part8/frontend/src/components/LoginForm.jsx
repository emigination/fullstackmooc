import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { LOG_IN } from '../queries';

const LoginForm = ({ show, setPage, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, loginResult] = useMutation(LOG_IN)

  useEffect(() => {
    if (loginResult.data) {
      const token = loginResult.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    }
  }, [loginResult.data])

  if (!show) return null

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  show: PropTypes.bool.isRequired,
  setPage: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default LoginForm
