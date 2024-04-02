import { useState, useEffect, useRef, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Notification from './components/Notification';
import { useNotificationDispatch } from './NotificationContext';
import loginService from './services/login';
import blogService from './services/blogs';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import { UserContext } from './UserContext';

const App = () => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();
  const notificationDispatch = useNotificationDispatch();
  const [user, userDispatch] = useContext(UserContext);

  const setNotification = message => {
    notificationDispatch({ type: 'SET', payload: message });
    setTimeout(() => {
      notificationDispatch({ type: 'REMOVE', payload: message });
    }, 5000);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'LOGIN', payload: loggedUser });
      blogService.setToken(loggedUser.token);
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

  const likeMutation = useMutation({
    mutationFn: blog => blogService.update({ ...blog, likes: blog.likes + 1 }),
    onSuccess: () => queryClient.invalidateQueries('blogs'),
  });

  const deleteMutation = useMutation({
    mutationFn: blog => blogService.destroy(blog.id),
    onSuccess: () => queryClient.invalidateQueries('blogs'),
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
      userDispatch({ type: 'LOGIN', payload: userLoggingIn });
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
    userDispatch({ type: 'LOGOUT' });
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
        likeMutation={likeMutation}
        deleteMutation={deleteMutation}
      />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm addBlogMutation={addBlogMutation} />
      </Togglable>
    </div>
  );
};

export default App;
