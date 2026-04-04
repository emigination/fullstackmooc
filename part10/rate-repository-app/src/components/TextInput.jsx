import { TextInput as NativeTextInput, StyleSheet, View } from 'react-native';
import ErrorText from './ErrorText'
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    borderColor: theme.colors.inputBorder,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
  },
  error: {
    borderColor: theme.colors.errorMessage,
  }
});

const TextInput = ({ errors, style, ...props }) => {
  const inputStyle = [
    styles.input,
    errors && styles.error,
    style
  ];

  return <View>
    <NativeTextInput style={inputStyle} {...props} />
    {errors && (<ErrorText>{errors}</ErrorText>)}
  </View>;
};

export default TextInput;
