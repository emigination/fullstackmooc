import { useParams } from 'react-router-native';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Review from './Review';

const RepositoryView = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, { variables: { id: id }, fetchPolicy: 'cache-and-network' });
  if (loading) return <></>

  const reviews = data.repository.reviews.edges.map(edge => edge.node)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <Review review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={data.repository} renderLink />}
    />
  );
};

export default RepositoryView;
