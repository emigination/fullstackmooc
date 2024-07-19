import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, isOwn, likeMutation, deleteMutation }) => {
  const [view, setView] = useState('concise');
  const addLike = () => likeMutation.mutate(blog);
  const remove = async () => {
    if (window.confirm(`Delete blog ${blog.title}?`)) {
      deleteMutation.mutate(blog);
    }
  };

  if (view === 'details') {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setView('concise')}>hide</button>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes} <button onClick={addLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {isOwn && (
          <p>
            <button onClick={remove}>delete</button>
          </p>
        )}
      </div>
    );
  } else if (view === 'concise') {
    return (
      <div>
        {blog.title} {blog.author}
        <button className='view-button' onClick={() => setView('details')}>
          view
        </button>
      </div>
    );
  }
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  likeMutation: PropTypes.object.isRequired,
  deleteMutation: PropTypes.object.isRequired,
};

export default Blog;
