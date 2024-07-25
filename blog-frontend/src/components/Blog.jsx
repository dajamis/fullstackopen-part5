import { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleLike , handleDelete, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  return (
    <div className='blog'>
      <p>
        {blog.title} {blog.author} 
        <button onClick={toggleVisibility}>
          {blogVisible ? 'hide' : 'view'}
        </button>
      </p>
      {blogVisible && (
        <div className="blogDetails">
          <p>{blog.title}</p>
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></p>
          <p>{blog.user.name}</p>
          {user && blog.user && blog.user.username === user.username && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
