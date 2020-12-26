import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './BlogsView.css'

function BlogsView() {
    const blogs = useSelector(state => state.blogs)

    return (
        <div>
            <ul>
            {blogs.map(blog => 
                <div key={blog.id} className='blog__Container'>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
            )}
            </ul>
        </div>
    )
}

export default BlogsView
