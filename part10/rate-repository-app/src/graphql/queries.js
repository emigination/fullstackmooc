import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          language
          ownerAvatarUrl
          reviewCount
          ratingAverage
          stargazersCount
        }
      }
    }
  }
`;
