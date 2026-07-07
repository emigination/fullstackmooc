import { View } from 'react-native';
import { useNavigate } from 'react-router-native';

import Button from './Button'
import TextInput from './TextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextInputLabel from './TextInputLabel';
import useCreateReview from '../hooks/useCreateReview'

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').min(0, 'Rating must be between 0 and 100').max(100, 'Rating must be between 0 and 100'),
  reviewText: yup.string(),
});

export const NewReviewForm = ({ onSubmit }) => {
  return <Formik
      initialValues={{ ownerName: '', repositoryName: '', rating: null, reviewText: ''  }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, handleChange, handleSubmit, touched, values }) => (
        <View>
          <TextInputLabel>Repository owner name</TextInputLabel>
          <TextInput
            onChangeText={handleChange('ownerName')}
            value={values.ownerName}
            errors={touched.ownerName && errors.ownerName}
            testID='ownerName'
            autoCapitalize='none'
            autoCorrect={false}
          />
          <TextInputLabel>Repository name</TextInputLabel>
          <TextInput
            onChangeText={handleChange('repositoryName')}
            value={values.repositoryName}
            errors={touched.repositoryName && errors.repositoryName}
            testID='repositoryName'
            autoCapitalize='none'
            autoCorrect={false}
          />
          <TextInputLabel>Rating</TextInputLabel>
          <TextInput
            onChangeText={handleChange('rating')}
            value={values.rating}
            errors={touched.rating && errors.rating}
            testID='rating'
            inputMode='numeric'
          />
          <TextInputLabel>Review</TextInputLabel>
          <TextInput
            onChangeText={handleChange('reviewText')}
            value={values.reviewText}
            errors={touched.reviewText && errors.reviewText}
            testID='reviewText'
            multiline
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>;
}

const NewReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async ({ ownerName, repositoryName, rating, reviewText: text }) => {
    try {
      const { data, errors } = await createReview({ ownerName, repositoryName, rating, text });
      if (errors && errors.length > 0) console.log(errors.map((error) => error.message));
      const repositoryId = data?.createReview?.repositoryId
      if (repositoryId) navigate(`/${repositoryId}`)
    } catch (e) {
      console.log(e);
    }
  };

  return <NewReviewForm onSubmit={onSubmit} />
};

export default NewReview;
