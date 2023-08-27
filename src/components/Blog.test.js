import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title', () => {
  const blog = { title: 'Blog Title', url: 'https://example.com', likes: 0, user: { name: 'Blog User' } }

  render(<Blog blog={blog} isOwn={false} />)

  screen.getByText('Blog Title')
})

test('display blog details when view button is clicked', async () => {
  const blog = { title: 'Blog Title', author: 'Blog Author', url: 'https://example.com', likes: 0, user: { name: 'Blog User' } }
  render(<Blog blog={blog} isOwn={false} />)
  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  screen.getByText('Blog Title Blog Author')
  screen.getByText('https://example.com')
  screen.getByText('0')
  screen.getByText('Blog User')
})
