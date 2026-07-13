import { gql } from '@apollo/client';

export const AUTHENTICATE  = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW  = gql`
  mutation CreateReview($reviewData: CreateReviewInput!) {
    createReview(review: $reviewData) {
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($userData: CreateUserInput!) {
    createUser(user: $userData) {
      id
    }
  }
`;
