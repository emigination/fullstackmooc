import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
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
      <h1 className='title is-2'>Blogs</h1>
      <div className='pl-5'>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <p key={blog.id} className='block'>
              <a href={`/blogs/${blog.id}`}>{blog.title}</a>
            </p>
          ))}
      </div>
    </div>
  );
};

BlogList.propTypes = {
  queryFunction: PropTypes.func.isRequired,
  likeMutation: PropTypes.object.isRequired,
  deleteMutation: PropTypes.object.isRequired,
};

export default BlogList;
