import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 4,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({repositories}) => {
  const repositoryNodes = repositories?.edges ? repositories.edges.map(edge => edge.node) : [];
  const navigate = useNavigate()
  const onPress = (id) => navigate(`/${id}`)

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem ={({ item }) => {
        return (
          <Pressable onPress={() => onPress(item.id)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )
      }}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories}/>
};

export default RepositoryList;
