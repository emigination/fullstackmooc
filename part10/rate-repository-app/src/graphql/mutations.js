import { gql } from '@apollo/client';

gql`
  input AuthenticateInput {
    username: String
    password: String
  }
`;

export const AUTHENTICATE  = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
