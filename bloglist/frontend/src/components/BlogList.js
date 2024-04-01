import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogList = ({ blogs, user, likeMutation, deleteMutation }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            isOwn={blog.user.username === user.username}
            likeMutation={likeMutation}
            deleteMutation={deleteMutation}
          />
        ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object.isRequired,
  likeMutation: PropTypes.object.isRequired,
  deleteMutation: PropTypes.object.isRequired,
};

export default BlogList;
