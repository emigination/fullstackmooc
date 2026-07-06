import { Button as NativeButton, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  button: {
    margin: 15,
  },
});

const Button = (props) => {
  return <View style={styles.button}><NativeButton {...props} /></View>;
};

export default Button;

