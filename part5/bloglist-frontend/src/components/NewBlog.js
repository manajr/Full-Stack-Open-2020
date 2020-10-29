import React, {useState} from 'react'
import NewBlogForm from './NewBlogForm'
import './NewBlog.css'

function NewBlog({createBlog}) {
  const voidBlogFormState = {
    title: '',
    author: '',
    url:'',
  }
  const [newBlog, setNewBlog] = useState(voidBlogFormState)

  const addBlog = (event) =>{
    event.preventDefault()

    createBlog(newBlog)

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
            )
          }
          <button type="submit">create</button>
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
