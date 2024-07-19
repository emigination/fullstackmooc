import { useState } from 'react';

const BlogForm = ({ addBlogMutation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const submitBlog = event => {
    event.preventDefault();
    addBlogMutation.mutate({ title: title, author: author, url: url });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div className='block'>
      <h2 className='title is-4 is-capitalized'>create new</h2>
      <form onSubmit={submitBlog}>
        <div className='block'>
          <label htmlFor='title' className='is-capitalized mr-2'>title</label>
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className='block'>
          <label htmlFor='author' className='is-capitalized mr-2'>author</label>
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className='block'>
          <label htmlFor='url' className='is-capitalized mr-2'>URL</label>
          <input
            id='url'
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit' id='create' className='button is-primary is-light is-capitalized block'>
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
