import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER } from '../graphql/queries';

const useUser = () => {
  const { data, loading } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'cache-and-network' });
  if (loading) return null;

  return data.me;
};

export default useUser;
