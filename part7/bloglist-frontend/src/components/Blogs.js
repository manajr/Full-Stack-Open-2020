import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, deleteBlog } from '../reducer/blogsReducer'
import { notifyMessage } from '../reducer/notificationReducer'

const Blog = ({ blog }) => {
  const [viewInfo, setViewInfo] = useState(false)
  const dispatch = useDispatch()

  const clickViewHandle = (event) => {
    event.preventDefault()
    setViewInfo(!viewInfo)
  }

  const handleDelete = (event) => {
    event.preventDefault()

    if (window.confirm(`Do you really want to delete ${blog.title}?`)){
      dispatch(deleteBlog(blog.id, blog))
      dispatch(notifyMessage(`Blog ${blog.title} was deleted`, 5))
    }
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
              type='submit' onClick={() => dispatch(addLike(blog.id, blog))}>likes</button></span>
          <span>{blog.user.name}</span>
          <button className='btn btnBlog__Delete' id={blog.id}
            type='submit' onClick={handleDelete}>delete</button>
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

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      {blogs.map(blog => 
        <Blog 
          key={blog.id}
          blog={blog}
          />
        )}
    </div>
  )
}

export default Blogs