import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, isOwn, update, destroy }) => {
  const [view, setView] = useState('concise')
  const [likes, setLikes] = useState(blog.likes)
  const addLike = async () => {
    update({ ...blog, likes: likes + 1 })
    setLikes(likes + 1)
  }
  const remove = async () => {
    if (window.confirm(`Delete blog ${blog.title}?`)) {
      destroy(blog.id)
      setView('hidden')
    }
  }

  if (view === 'details') {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setView('concise')}>hide</button>
        <p>{blog.url}</p>
        <p>likes: {likes} <button onClick={addLike}>like</button></p>
        <p>{blog.user.name}</p>
        {isOwn && <p><button onClick={remove}>delete</button></p>}
      </div>
    )
  } else if (view === 'concise') {
    return (
      <div>
        {blog.title} {blog.author}
        <button className='view-button' onClick={() => setView('details')}>view</button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  update: PropTypes.func,
  destroy: PropTypes.func
}

export default Blog
