import React from 'react'

const Filter = (props) => {
    const {newSearch, handleChange} = props
    return(
        <div>
            filter shown with: <input 
            value={newSearch}
            onChange={handleChange}
            />
        </div>
    )
}


export default Filter