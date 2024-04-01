import { useState, useEffect, useRef } from 'react';
import Notification from './components/Notification';
import { useNotificationDispatch } from './NotificationContext';
import loginService from './services/login';
import blogService from './services/blogs';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();
  const notificationDispatch = useNotificationDispatch();

  const setNotification = message => {
    notificationDispatch({ type: 'SET', payload: message });
    setTimeout(() => {
      notificationDispatch({ type: 'REMOVE', payload: message });
    }, 5000);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const userLoggingIn = await loginService.login({ username, password });
      setUser(userLoggingIn);
      blogService.setToken(userLoggingIn.token);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('user', JSON.stringify(userLoggingIn));
    } catch (exception) {
      setNotification(exception.response.data.error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
    blogService.setToken(null);
  };

  const createNewBlog = async blogData => {
    blogFormRef.current.toggleVisibility();
    try {
      const newBlog = await blogService.createNew(blogData);
      setBlogs(blogs.concat(newBlog));
      setNotification('A new blog was added');
    } catch (exception) {
      setNotification(exception.response?.data?.error || 'Invalid input');
    }
  };

  if (user === null) {
    return (
      <div>
        <div>
          <Notification />
        </div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Notification />
      </div>
      Logged in as &quot;{user.name}&quot;
      <button onClick={() => handleLogout()}>Log out</button>
      <BlogList
        blogs={blogs}
        user={user}
        update={blogService.update}
        destroy={blogService.destroy}
      />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
    </div>
  );
};

export default App;
