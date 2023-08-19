import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} isOwn={blog.user.username === user.username} />
      )}
    </div>
  )
}

export default BlogList
