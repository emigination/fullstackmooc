import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

const RepositoryView = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, { variables: { id: id }, fetchPolicy: 'cache-and-network' });
  if (loading) return <></>

  return <RepositoryItem repository={data.repository} renderLink />
};

export default RepositoryView;
