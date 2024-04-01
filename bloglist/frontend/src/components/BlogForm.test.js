import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('calls createNewBlog with correct parameters', async () => {
  const mockHandler = jest.fn();
  render(<BlogForm createNewBlog={mockHandler} />);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText('title'), 'Blog Title');
  await user.type(screen.getByLabelText('author'), 'Blog Author');
  await user.type(screen.getByLabelText('url'), 'https://example.com');
  await user.click(screen.getByText('create'));

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0]).toEqual({
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'https://example.com',
  });
});
