import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  avatar: {
    height: 60,
    width: 60,
  },
  container: {
    borderColor: theme.colors.separator,
    borderRadius: 20,
    borderWidth: 1,
    margin: 2,
    padding: 10,
  },
  descriptions: {
    flex: 1,
  },
  language: {
    fontStyle: 'italic',
  },
  topHalf: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  bottomHalf: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  keyNumberBox: {
    alignItems: 'center',
  },
});


const KeyNumberBox = ( { title, number }) => {
  const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <View style={styles.keyNumberBox}>
      <Text>{title}</Text>
      <Text fontWeight='bold'>{numberFormatter.format(number)}</Text>
    </View>
  )
}

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar}/>
        <View style={styles.descriptions}>
          <Text fontWeight='bold'>{repository.fullName}</Text>
          <Text>{repository.description}</Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.bottomHalf}>
        <KeyNumberBox title='Stars' number={repository.stargazersCount}/>
        <KeyNumberBox title='Forks' number={repository.forksCount}/>
        <KeyNumberBox title='Reviews' number={repository.reviewCount}/>
        <KeyNumberBox title='Rating' number={repository.ratingAverage}/>
      </View>
    </View>
  );
};

export default RepositoryItem;
