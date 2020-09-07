import React from 'react'

const PersonForm = (props) => {
    const {newItem, handleChange, text} = props
    return(
        <div>
          {text} <input 
          value={newItem}
          onChange={handleChange}
          />
        </div>
    )
}

export default PersonForm