import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import LoggerMessage from './components/LoggerMessage'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const initialState = {
    title: '',
    author: '',
    url:''
  }
  const [newBlog, setNewBlog] = useState(initialState)
  const [showForm, setShowForm] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      const user = await loginService.login({username, password})
      await blogService.getUserBlogs(user).then(blogs => setBlogs(blogs))
      .then(setErrorMessage(`Welcome ${user.name}`))
      .then(setTimeout(()=> {setErrorMessage('')},5000))

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

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    try{
      await blogService.create(newBlog)
      .then(response => setBlogs(blogs.concat(response)))
      .then(() =>
       setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`))
      .then(setTimeout( ()=> setErrorMessage(''),5000))
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
      await blogService.deleteBlog(id.toString())
      .then(() => {setBlogs(filteredBlogs)})
      .then(() => setErrorMessage(`Blog ${deletedBlog.title} was deleted`))
      .then(setTimeout(()=> setErrorMessage(null),5000))
    } catch(err){
      console.log(err)
    }
  }

  const loginForm = () => (
    <LoginForm handleLogin={handleLogin}
    username={username} password={password}
    handleUsernameChange={({target}) => setUsername(target.value)}
    handlePasswordChange={ ({ target }) => setPassword(target.value)}
    />
    )

  const postBlogForm = () => {
    let names = Object.keys(newBlog)
    return(
      <div>
        <h2>create a new blog</h2>
        <form onSubmit={handleCreateNewBlog}>
          {names.map( contentName => 
          <NewBlog key={contentName} newPost={newBlog} name={contentName} handleNewBlogChange={
            ({target}) =>{
              setNewBlog((prev) => ({...prev, [target.name]: target.value}))
            }
          }/>)
          }
          <button type="submit">create</button>
        </form>
      </div>
    )
 }
 
  const blogPosts = () =>(
      <div>
        {postBlogForm()}
      {blogs.map((blog,i) =>
        <Blog key={i} clickDeleteHandle={handleDeleteBlog} blog={blog} />
      )}
      </div>
  )

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