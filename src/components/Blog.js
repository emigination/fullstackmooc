import { useState } from "react"

const Blog = ({ blog }) => {
  const [detailView, setDetailView] = useState(false)
  if (detailView) {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetailView(false)}>hide</button>
        <p>{blog.url}</p>
        <p>{blog.likes} <button>like</button></p>
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
