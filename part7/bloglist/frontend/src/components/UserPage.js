import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const UserPage = ({ queryFunction }) => {
  const userId = useParams().id;
  const userResult = useQuery({ queryKey: ['user', userId], queryFn: queryFunction });
  if (userResult.isLoading) return <div>Loading...</div>;
  if (userResult.isError) return <div>Server-side error</div>;

  const user = userResult.data;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2 className='title is-2 block'>{user.name}</h2>
      <h3 className='block title is-5'>Added blogs</h3>
      <ul className='block'>
        {user.blogs.map(blog => (
          <li key={blog.id} className='block'>
            <a href={`/blogs/${blog.id}`}>{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPage;
