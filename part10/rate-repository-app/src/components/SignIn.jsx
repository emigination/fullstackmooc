import { Button, View } from 'react-native';
import TextInput from './TextInput';
import { Formik } from 'formik';
import * as yup from 'yup';

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

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, handleChange, handleSubmit, touched, values }) => (
        <View>
          <TextInput
            onChangeText={handleChange('username')}
            value={values.username}
            errors={touched.username && errors.username}
          />
          <TextInput
            onChangeText={handleChange('password')}
            secureTextEntry
            value={values.password}
            errors={touched.password && errors.password}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>;
};

export default SignIn;
