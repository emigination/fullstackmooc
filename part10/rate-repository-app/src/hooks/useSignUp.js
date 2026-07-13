import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER);
  const signUp = async (userData) => {
    const { data, loading } = await createUser({ variables: { userData } })
    if (loading) return {}
    return data
  };

  return [signUp, result];
};

export default useSignUp;
