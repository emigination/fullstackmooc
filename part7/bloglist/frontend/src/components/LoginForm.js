const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <h2 className='title is-3'>Log in</h2>
      <form onSubmit={handleLogin}>
        <div className='block'>
          <span className='mr-3'>Username:</span>
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='block'>
          <span className='mr-3'>Password:</span>
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login' type='submit' className='button is-primary is-light block is-capitalized'>
          log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
