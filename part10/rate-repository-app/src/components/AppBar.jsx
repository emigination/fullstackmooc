import { Pressable, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 8,
    marginBottom: 8,
    alignItems: 'center',
    borderBottomColor: theme.colors.separator,
    borderBottomWidth: 0.5,
  }
});

const AppBarTab = ({ title }) => {
  return (
    <View>
      <Pressable onPress={() => {}}>
        <Text color='primary'>{title}</Text>
      </Pressable>
    </View>
  )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab title='Repositories' />
    </View>
  );
};

export default AppBar;
