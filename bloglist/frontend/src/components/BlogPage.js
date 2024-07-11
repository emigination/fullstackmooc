import { useQuery } from '@tanstack/react-query';
import { useUserValue } from '../UserContext';
import { useParams } from 'react-router-dom';

const BlogPage = ({ queryFunction, likeMutation, deleteMutation, addCommentMutation }) => {
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
      window.location.href = '/';
    }
  };
  const addComment = () => {
    const content = document.getElementById('newComment').value;
    if (!content) return;

    addCommentMutation.mutate({ blogId, content });
    document.getElementById('newComment').value = '';
  }

  return (
    <div>
      <h2 className='title is-2 block'>{blog.title}</h2>
      <div className='block'><a href={blog.url}>{blog.url}</a></div>
      <div className='block'>
        <p>{blog.likes} likes <button onClick={addLike} className='button is-primary is-light is-capitalized ml-4'>like</button></p>
      </div>
      <div className='block'>
        <p>
          Added by <a href={`/users/${blog.user.id}`}>{blog.user.name}</a>
        </p>
      </div>
      {blog.user.username === user.username && (
        <p className='block'>
          <button onClick={remove} className='button is-danger is-light'>Delete</button>
        </p>
      )}
      <h3 className='block title is-5 is-capitalized mt-6'>comments</h3>
      <form className='block'>
        <input id='newComment'></input>
        <button type='submit' id='postComment' onClick={addComment} className='button is-primary is-light ml-4'>Add comment</button>
      </form>
      <ul className='block'>
        {blog.comments.map((comment, index) => (
          <li key={index} className='block'>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
