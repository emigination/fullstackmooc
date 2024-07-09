import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import Blog from './Blog';
import { useUserValue } from '../UserContext';

const BlogList = ({ queryFunction, likeMutation, deleteMutation }) => {
  const user = useUserValue();
  const blogsResult = useQuery({ queryKey: ['blogs'], queryFn: queryFunction });
  if (blogsResult.isLoading) {
    return <div>Loading...</div>;
  }
  if (blogsResult.isError) {
    return <div>Server-side error</div>;
  }
  const blogs = blogsResult.data;
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
  queryFunction: PropTypes.func.isRequired,
  likeMutation: PropTypes.object.isRequired,
  deleteMutation: PropTypes.object.isRequired,
};

export default BlogList;
