import React from 'react'

const NewBlog = ({newPost, name, handleNewBlogChange}) => {
  
  return ( 
      <div>
        {name}:<input type='text' value={newPost.name}
        onChange={handleNewBlogChange} name={name}/>
      </div>
  )
}


export default NewBlog