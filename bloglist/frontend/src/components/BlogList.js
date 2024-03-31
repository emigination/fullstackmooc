import PropTypes from 'prop-types'
import Blog from './Blog'

const BlogList = ({ blogs, user, update, destroy }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} isOwn={blog.user.username === user.username} update={update} destroy={destroy} />
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object.isRequired
}

export default BlogList
