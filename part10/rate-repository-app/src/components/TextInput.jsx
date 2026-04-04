import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

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
  }
});

const TextInput = ({ style, ...props }) => {
  const inputStyle = [
    styles.input,
    style
  ];

  return <NativeTextInput style={inputStyle} {...props} />;
};

export default TextInput;
