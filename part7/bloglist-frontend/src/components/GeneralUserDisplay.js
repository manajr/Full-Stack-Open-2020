import React, { useRef } from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'
import Blogs from './Blogs'
import LoggerMessage from './LoggerMessage'
import Toggle from './Toggle'
import NewBlog from './NewBlog'
import Logout from './Logout'
import { useSelector } from 'react-redux'

function GeneralUserDisplay() {
    const user = useSelector(state => state.user)
    const blogFormRef = useRef()
    console.log(user)
    
    const padding ={
        padding: 5
    }

    return (
        <div>
          <h2>blogs</h2>
          <LoggerMessage/>
          <p>User {user.name} logged in
          <Logout />
          </p>
          <Router>
                <div>
                    <Link style={padding} to='/'>home</Link>
                </div>
                <div>
                    <Toggle btnLabel={'create new blog'} ref={blogFormRef}>
                    <NewBlog blogFormRef={blogFormRef} />
                    </Toggle>
                    <Blogs />
                </div>
            </Router>
        </div>
    )
}

export default GeneralUserDisplay
