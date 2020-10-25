import React from 'react'
const Blog = ({ blog, clickDeleteHandle}) => {
  
  return(
  <div>
    {blog.title} {blog.author}
    <button id={blog.id} type='submit' onClick={clickDeleteHandle}>delete</button>
  </div>
  )
}

export default Blog
