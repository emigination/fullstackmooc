import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList.jsx'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      await render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });
      for (let i = 0; i < 2; i++) {
        expect(repositoryItems[i]).toHaveTextContent(repositories.edges[i].node.fullName, { exact: false })
        expect(repositoryItems[i]).toHaveTextContent(repositories.edges[i].node.description, { exact: false })
        expect(repositoryItems[i]).toHaveTextContent(repositories.edges[i].node.language, { exact: false })
        expect(repositoryItems[i]).toHaveTextContent(numberFormatter.format(repositories.edges[i].node.forksCount), { exact: false })
        expect(repositoryItems[i]).toHaveTextContent(numberFormatter.format(repositories.edges[i].node.stargazersCount), { exact: false })
        expect(repositoryItems[i]).toHaveTextContent(repositories.edges[i].node.ratingAverage.toString(), { exact: false })
        expect(repositoryItems[i]).toHaveTextContent(numberFormatter.format(repositories.edges[i].node.reviewCount), { exact: false })
      }
    });
  });
});
