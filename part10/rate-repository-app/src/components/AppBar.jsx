import { View, StyleSheet } from 'react-native';
import { useLocation } from 'react-router-native';

import Constants from 'expo-constants';
import { Link } from "react-router-native";
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 8,
    justifyContent: 'space-evenly',
    borderBottomColor: theme.colors.separator,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
});

const AppBarTab = ({ title, route }) => {
  const currentPath = useLocation().pathname
  const active = currentPath === route
  return (
    <Link to={route}>
      <Text color={active ? 'primary': 'textSecondary'} fontWeight={active && 'bold'}>{title}</Text>
    </Link>
  )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab title='Repositories' route='/' />
      <AppBarTab title='Sign in' route='/sign-in' />
    </View>
  );
};

export default AppBar;
