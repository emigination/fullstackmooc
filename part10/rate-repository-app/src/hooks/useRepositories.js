import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' });
  if (loading) return <>...</>;

  return { repositories: data.repositories, loading, refetch: data.refetch };
};

export default useRepositories;
