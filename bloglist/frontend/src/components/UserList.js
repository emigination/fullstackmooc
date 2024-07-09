import { useQuery } from '@tanstack/react-query';
import { useUserValue } from '../UserContext';

const UserList = ({ queryFunction }) => {
  const user = useUserValue();
  const usersResult = useQuery({ queryKey: ['users'], queryFn: queryFunction });
  if (usersResult.isLoading) {
    return <div>Loading...</div>;
  }
  if (usersResult.isError) {
    return <div>Server-side error</div>;
  }
  const users = usersResult.data;
  return (
    <div>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
