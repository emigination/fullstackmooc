import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommendations from './components/Recommendations';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const logOut = () => {
    setToken(null);
    localStorage.clear();
    setPage('authors');
  }

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) setToken(token);
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('recommendations')}>recommendations</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logOut}>log out</button>
          </>
        ) : <button onClick={() => setPage('login')}>log in</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <Recommendations show={page === 'recommendations'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setPage={setPage} setToken={setToken}/>
    </div>
  );
};

export default App;
