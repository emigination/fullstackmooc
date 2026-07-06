import { Button, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import TextInput from './TextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextInputLabel from './TextInputLabel';
import useSignIn from '../hooks/useSignIn'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must contain 3 or more characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must contain 8 or more characters')
    .required('Password is required'),
});

export const SignInForm = ({ onSubmit }) => {
  return <Formik
      initialValues={{ username: '', password: '' }}
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
            testID='username'
          />
          <TextInputLabel>Password</TextInputLabel>
          <TextInput
            onChangeText={handleChange('password')}
            secureTextEntry
            value={values.password}
            errors={touched.password && errors.password}
            testID='password'
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>;
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      if (data?.authenticate?.accessToken) navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />
};

export default SignIn;
