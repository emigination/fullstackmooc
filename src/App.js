import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userLoggingIn = await loginService.login({ username, password })
      setUser(userLoggingIn)
      blogService.setToken(userLoggingIn.token)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('user', JSON.stringify(userLoggingIn))
    } catch (exception) {
      setNotification(exception.response.data.error)
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    blogService.setToken(null)
  }

  const createNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.createNew({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification('A new blog was added')
      setTimeout(() => { setNotification(null) }, 5000)
    } catch (exception) {
      setNotification(exception.response?.data?.error || "Invalid input")
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <div>
          <Notification message={notification} />
        </div>
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div>
            username:
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:
              <input
              type="password"
              value={password}

              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Notification message={notification} />
       </div>
      Logged in as "{user.name}"
      <button onClick={() => handleLogout()}>Log out</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
