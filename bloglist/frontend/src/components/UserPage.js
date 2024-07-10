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
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserPage;
