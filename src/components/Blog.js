import { useState } from "react"
import { update } from "../services/blogs"

const Blog = ({ blog }) => {
  const [detailView, setDetailView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const addLike = async () => {
    update({ ...blog, likes: likes + 1 })
    setLikes(likes + 1)
  }

  if (detailView) {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetailView(false)}>hide</button>
        <p>{blog.url}</p>
        <p>{likes} <button onClick={addLike}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    )
  } else {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetailView(true)}>view</button>
      </div>
    )
  }
}

export default Blog
