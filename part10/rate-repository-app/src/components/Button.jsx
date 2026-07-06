import { Button as NativeButton, StyleSheet, View } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    margin: 15,
  },
});

const Button = (props) => {
  return <View style={styles.button}><NativeButton color={theme.colors.primary} {...props} /></View>;
};

export default Button;

