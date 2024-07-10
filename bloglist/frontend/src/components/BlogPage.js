import { useQuery } from '@tanstack/react-query';
import { useUserValue } from '../UserContext';
import { useParams } from 'react-router-dom';

const BlogPage = ({ queryFunction, likeMutation, deleteMutation }) => {
  const user = useUserValue();
  const blogId = useParams().id;
  const blogResult = useQuery({ queryKey: ['blog', blogId], queryFn: queryFunction });
  if (blogResult.isLoading) return <div>Loading...</div>;
  if (blogResult.isError) return <div>Server-side error</div>;

  const blog = blogResult.data;
  if (!blog) return <div>Blog not found</div>;

  const addLike = () => likeMutation.mutate(blog);
  const remove = async () => {
    if (window.confirm(`Delete blog ${blog.title}?`)) {
      deleteMutation.mutate(blog);
    }
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={addLike}>like</button></p>
      <p>added by {blog.user.name}</p>
      {blog.user.username === user.username && (
        <p>
          <button onClick={remove}>delete</button>
        </p>
      )}
    </div>
  );
};

export default BlogPage;
