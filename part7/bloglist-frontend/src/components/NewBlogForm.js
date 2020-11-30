import React from 'react'

const NewBlogForm = ({ newPost, label, handleFormChange }) => {

  return ( 
      <div>
        {label}:<input id={label} type='text' value={newPost.label}
        onChange={handleFormChange} name={label}/>
      </div>
  )
}

export default NewBlogForm