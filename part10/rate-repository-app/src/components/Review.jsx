import { StyleSheet, View } from 'react-native';

import Text from './Text';
import theme from '../theme';
import { formatDate } from '../utils/dates';

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.separator,
    borderRadius: 20,
    borderWidth: 1,
    margin: 2,
    padding: 10,
    flexDirection: 'row',
  },
  rating: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    borderRadius: 50,
    borderWidth: 2,
    height: 50,
    width: 50,
  },
  rightColumn : {
    gap: 5,
    margin: 5,
  },
  text: {
    paddingRight: 50,
  },
});


const Review = ({ review }) => {
 return (
    <View style={styles.container}>
      <View>
        <View style={styles.rating}>
          <Text fontWeight='bold' color='primary'>{review.rating}</Text>
        </View>
      </View>
      <View style={styles.rightColumn}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text>{formatDate(review.createdAt)}</Text>
        <View style={styles.text}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  )
};

export default Review;
