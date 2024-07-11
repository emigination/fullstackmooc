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
      <h1 className='title is-2'>Users</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map(user => (
              <tr key={user.id}>
                <td><a href={`/users/${user.id}`}>{user.name}</a></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
