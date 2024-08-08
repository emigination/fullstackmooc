import { useEffect, useRef, useState } from 'react';
import { useSubscription } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Notification from './components/Notification';
import Recommendations from './components/Recommendations';
import { BOOK_ADDED } from './queries';

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

  const notificationRef = useRef();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const title = data.data.bookAdded.title;
      notificationRef.current.setMessages([`New book added: ${title}`, ...notificationRef.current.messages]);
      setTimeout(() => {
        const messages = notificationRef.current.messages;
        notificationRef.current.setMessages(messages.slice(0, -1));
      }, 5000);
    }
  });

  return (
    <div>
      <Notification ref={notificationRef}/>
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
