import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        node {
          id
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

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      description
      forksCount
      fullName
      language
      ownerAvatarUrl
      reviewCount
      ratingAverage
      stargazersCount
      url
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
