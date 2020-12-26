import React, { useEffect } from 'react'
import Login from './components/Login'
import GeneralUserDisplay from './components/GeneralUserDisplay'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducer/blogsReducer'
import { loggedUser } from "./reducer/loginReducer"
import { initialUserList } from "./reducer/userListReducer"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  

  useEffect(() => {
    dispatch(initialUserList())
    dispatch(initializeBlogs())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(loggedUser(user))
      
      blogService.setToken(user.token)
      //blogService.getUserBlogs(user).then(blogs => setBlogs(blogs))
    }
  }, [dispatch])

  return (
    <div>
      {user === null ?
        <Login /> :
        <GeneralUserDisplay />
      }
    </div>
  )
}

export default App