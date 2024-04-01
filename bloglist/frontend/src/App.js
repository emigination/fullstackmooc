import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Notification from './components/Notification';
import { useNotificationDispatch } from './NotificationContext';
import loginService from './services/login';
import blogService from './services/blogs';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
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

  const addBlogMutation = useMutation({
    mutationFn: blogService.createNew,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
      blogFormRef.current.toggleVisibility();
      setNotification('A new blog was added');
    },
  });

  const result = useQuery({ queryKey: ['blogs'], queryFn: blogService.getAll });
  if (result.isLoading) {
    return <div>Loading...</div>;
  }
  if (result.isError) {
    return <div>Server-side error</div>;
  }
  const blogs = result.data;

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
        <BlogForm addBlogMutation={addBlogMutation} />
      </Togglable>
    </div>
  );
};

export default App;
