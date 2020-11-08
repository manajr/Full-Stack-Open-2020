import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterInput } from '../reducers/filterReducer'

function Filter() {
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch()

  const handlerFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    setTimeout(() => dispatch(filterInput(filter)), 1000)
  }

  return (
    <div>
     <form>
      <label>filter
        <input type='text'
        onChange={handlerFilter}>
        </input>
      </label>
     </form> 
    </div>
  )
}

export default Filter
