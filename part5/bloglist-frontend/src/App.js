import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import LoggerMessage from './components/LoggerMessage'
import Toggle from './components/Toggle'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getUserBlogs(user).then(blogs => setBlogs(blogs))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      const getUserPosts = await blogService.getUserBlogs(user)
      setBlogs(getUserPosts)

      setErrorMessage(`Welcome ${user.name}`)
      setTimeout(() => {setErrorMessage('')},5000)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setShowForm(!showForm)
    } catch (err) {
      setErrorMessage('Wrong credentials')
      console.log(errorMessage)
      setTimeout( () => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const userLogout = () => (
    <>
      <button type='submit' onClick={() => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
      }}>
        logout</button>
    </>
  )

  const addBlog = async (newBlog) => {
    try{
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout( () => setErrorMessage(''),5000)
    } catch(err) {
      console.log(err)
    }
  }

  const handleDeleteBlog = async (event) => {
    event.preventDefault()
    try{
      const id = event.target.id
      const filteredBlogs = blogs.filter(blog => blog.id !== id.toString())
      const deletedBlog = blogs.filter(blog => blog.id === id.toString())[0]
      if (window.confirm(`Do you really want to delete ${deletedBlog.title}?`)){
        await blogService.deleteBlog(id.toString())
        setBlogs(filteredBlogs)
        setErrorMessage(`Blog ${deletedBlog.title} was deleted`)
      }
      setTimeout(() => setErrorMessage(null),5000)
    } catch(err){
      console.log(err)
    }
  }

  const handleAddLike = async (event) => {
    event.preventDefault()
    const id = event.target.id
    let filterBlog = blogs.filter(blog =>
      blog.id.toString() === id)
    const updatedLikeNum = filterBlog[0].likes + 1

    try{
      await blogService.update(id, { likes:updatedLikeNum } )
      updateBlogState(id, { likes:updatedLikeNum })
    } catch(err) {
      console.log(err)
    }

  }

  const loginForm = () => (
    <LoginForm handleLogin={handleLogin}
      username={username} password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={ ({ target }) => setPassword(target.value)}
    />
  )

  const blogPosts = () => (
    <div>
      <Toggle btnLabel={'create new blog'} ref={blogFormRef}>
        <NewBlog createBlog={addBlog} />
      </Toggle>
      {blogs.map((blog,i) =>
        <Blog key={i} clickDeleteHandle={handleDeleteBlog}
          blog={blog}
          handleAddLike={handleAddLike}/>
      )}
    </div>
  )

  const updateBlogState = (id, itemAttributes) => {
    let index = blogs.findIndex( blog => blog.id === id)
    let updatedBlogLike = [
      ...blogs.slice(0, index),
      Object.assign({}, blogs[index], itemAttributes),
      ...blogs.slice(index+1)
    ]
    updatedBlogLike.sort((actual, next) => next.likes - actual.likes)
    if (index === -1) console.log('Blog Index Error')
    else {
      setBlogs(updatedBlogLike)
    }
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <LoggerMessage message={errorMessage}/>
          <p>User {user.name} logged in
            {userLogout()}
          </p>
          {blogPosts()}
        </div>
      }

    </div>
  )
}

export default App