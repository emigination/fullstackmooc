import { Button, View } from 'react-native';
import TextInput from './TextInput';
import { Formik } from 'formik';

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
    >
     {({ handleChange, handleSubmit, values }) => (
       <View>
         <TextInput
           onChangeText={handleChange('username')}
           value={values.username}
         />
          <TextInput
           onChangeText={handleChange('password')}
           secureTextEntry
           value={values.password}
         />
         <Button onPress={handleSubmit} title="Submit" />
       </View>
     )}
   </Formik>;
};

export default SignIn;
