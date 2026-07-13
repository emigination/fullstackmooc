import { View } from 'react-native';

import Button from './Button'
import TextInput from './TextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextInputLabel from './TextInputLabel';
import useSignIn from '../hooks/useSignIn'
import useSignUp from '../hooks/useSignUp'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must contain 5-30 characters')
    .max(30, 'Username must contain 5-30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must contain 5-50 characters')
    .max(50, 'Password must contain 5-50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Password confirmation does not match the password')
    .required('Password confirmation is required')
});

export const SignUpForm = ({ onSubmit }) => {
  return <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, handleChange, handleSubmit, touched, values }) => (
        <View>
          <TextInputLabel>Username</TextInputLabel>
          <TextInput
            onChangeText={handleChange('username')}
            value={values.username}
            errors={touched.username && errors.username}
            autoComplete='username'
            testID='username'
          />
          <TextInputLabel>Password</TextInputLabel>
          <TextInput
            onChangeText={handleChange('password')}
            secureTextEntry
            value={values.password}
            errors={touched.password && errors.password}
            autoCapitalize='none'
            autoComplete='new-password'
            testID='password'
          />
          <TextInputLabel>Confirm password</TextInputLabel>
          <TextInput
            onChangeText={handleChange('passwordConfirmation')}
            secureTextEntry
            value={values.passwordConfirmation}
            errors={touched.passwordConfirmation && errors.passwordConfirmation}
            autoCapitalize='none'
            testID='passwordConfirmation'
          />
          <Button onPress={handleSubmit} title="Sign up" />
        </View>
      )}
    </Formik>;
}

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    try {
      const data = await signUp({ username: values.username, password: values.password });
      if (data?.createUser?.id) await signIn({ username: values.username, password: values.password });
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />
};

export default SignUp;
