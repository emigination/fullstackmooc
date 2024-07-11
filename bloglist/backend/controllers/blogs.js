const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 }).
    populate('comments', { content: 1 }, Comment);
  if (!blog) return response.status(404).end();

  response.json(blog);
});

blogsRouter.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing' });
  }

  const blogParams = request.body;
  if (!blogParams.title || !blogParams.url) {
    return response.status(400).end();
  }

  if (!blogParams.likes) {
    blogParams.likes = 0;
  }
  const user = await User.findById(request.user);
  blogParams.user = user._id;
  const blog = new Blog(blogParams);
  const savedBlog = await blog.save();
  savedBlog.populate('user', { username: 1, name: 1 });
  user.blogs = user.blogs.concat(blog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing' });
  }

  const blog = await Blog.findOne({
    _id: request.params.id,
    user: request.user,
  });
  if (blog) {
    blog.deleteOne();
    const user = await User.findById(blog.user);
    user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString());
    await user.save();
    response.status(204).end();
  } else {
    return response.status(404).end();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing' });
  }

  const blog = await Blog.findById(request.params.id);
  if (blog) {
    blog.likes = request.body.likes;
    await blog.save();
    response.status(200).json(blog);
  } else {
    return response.status(404).end();
  }
});

blogsRouter.post('/:id/comments', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing' });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) return response.status(404).end();
  if (!request.body.comment) return response.status(400).end();

  const comment = new Comment({ content: request.body.comment });
  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment);
  await blog.save();
  response.status(201).json(blog);
});

module.exports = blogsRouter;
