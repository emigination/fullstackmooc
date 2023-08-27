import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title', () => {
  const blog = { title: 'Blog Title', url: 'https://example.com', likes: 0, user: { name: 'Blog User' } }
  render(<Blog blog={blog} isOwn={false} />)
  screen.getByText('Blog Title')
})
