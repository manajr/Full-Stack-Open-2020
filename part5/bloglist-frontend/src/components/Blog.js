import React, { useState } from 'react'

const Blog = ({ blog, clickDeleteHandle, handleAddLike}) => {
  const [viewInfo, setViewInfo] = useState(false)
  const [like, setLike] = useState(0)

  const clickViewHandle = (event) => {
    event.preventDefault()
    setViewInfo(!viewInfo)
  }

  return(
    <div className='blog__Container'>
      {viewInfo 
        ? <div> 
          <span>{blog.title}</span>
          <span>{blog.author}</span>
          <span>{blog.url}</span>
          <span className='Blog__Likes'>likes {blog.likes}
            <button id={blog.id} className='btn btnBlog__Likes'
              type='submit' onClick={handleAddLike}>likes</button></span>
          <span>{blog.user.name}</span>
          <button className='btn btnBlog__Delete' id={blog.id} 
            type='submit' onClick={clickDeleteHandle}>delete</button>
        </div>
        : <div>
          <span>{blog.title}</span>
          <span>{blog.author}</span>
        </div>
      }

      <button className='btn btnBlog__View' type='submit'
        onClick={clickViewHandle}>view</button>
    </div>
  )
}

export default Blog