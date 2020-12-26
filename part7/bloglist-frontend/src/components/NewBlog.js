import React, {useState} from 'react'
import NewBlogForm from './NewBlogForm'
import './NewBlog.css'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducer/blogsReducer'
import { notifyMessage } from '../reducer/notificationReducer'
import blogService from '../services/blogs'

/*const Button = styled.button`
  background: #FB5F5F;
  border-radius: 6px; 
  font-family: Righteous;
  font-size: 1.3em;
  padding: .15em;
`*/

function NewBlog({ blogFormRef }) {
  const dispatch = useDispatch()
  const voidBlogFormState = {
    title: '',
    author: '',
    url:'',
  }

  const [newBlog, setNewBlog] = useState(voidBlogFormState)

  const addBlog = async (event) =>{
    event.preventDefault()

    try{
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(newBlog)
      dispatch(createBlog(createdBlog))
    } catch(err) {
      console.log(err)
    }

    dispatch(notifyMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5))
    setNewBlog(voidBlogFormState)
  }

  const handleFormChange = (event) => {
    event.preventDefault()
    event.persist()
    setNewBlog((prev) => ({...prev, [event.target.name]: event.target.value}))
  }

  const blogForm = () => {
    const formLabel = Object.keys(newBlog)
    return(
      <div>
        <form onSubmit={addBlog}>
          {formLabel.map( contentName => 
            <NewBlogForm key={contentName} newPost={newBlog} label={contentName}
              handleFormChange={handleFormChange}
            />
          )}
          <button id='newBlog__CreateBtn' type="submit">create</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2> Create a new Blog</h2>
      {blogForm()}
    </div>
  )
}

export default NewBlog
