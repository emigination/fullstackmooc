import { ScrollView, View, StyleSheet } from 'react-native';
import { useLocation } from 'react-router-native';

import Constants from 'expo-constants';
import { Link } from "react-router-native";
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingTop: Constants.statusBarHeight,
    borderBottomColor: theme.colors.separator,
    borderBottomWidth: 1,
  },
  scrollView: {
    gap: 8,
    justifyContent: 'space-evenly',
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 5,
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
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab title='Repositories' route='/' />
        <AppBarTab title='Sign in' route='/sign-in' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
