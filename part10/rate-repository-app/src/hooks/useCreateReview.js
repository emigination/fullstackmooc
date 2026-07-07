import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, { fetchPolicy: 'cache-and-network' });

  const createReview = async (reviewData) => {
    let rating = reviewData.rating
    if (typeof rating === 'string') rating = parseInt(rating)
    const { data, loading, errors } = await mutate({ variables: { reviewData: { ...reviewData, rating } } })
    if (loading) return {}

    return { data, errors }
  };

  return [createReview, result];
};

export default useCreateReview;
