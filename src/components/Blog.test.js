import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = { title: 'Blog Title', author: 'Blog Author', url: 'https://example.com', likes: 0, user: { name: 'Blog User' } }

test('renders blog title', () => {
  render(<Blog blog={blog} isOwn={false} />)

  screen.findByText('Blog Title')
})

test('display blog details when view button is clicked', async () => {
  render(<Blog blog={blog} isOwn={false} />)
  const user = userEvent.setup()

  await user.click(screen.getByText('view'))

  screen.getByText('Blog Title Blog Author')
  screen.getByText('https://example.com')
  screen.getByText('likes: 0')
  screen.getByText('Blog User')
})

test('clicking the like button twice calls update twice', async () => {
  const mockHandler = jest.fn()
  render(<Blog blog={blog} isOwn={false} update={mockHandler} />)
  const user = userEvent.setup()
  await user.click(screen.getByText('view'))
  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
