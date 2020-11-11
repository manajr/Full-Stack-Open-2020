import React, { useState } from 'react'
import { filterInput } from '../reducers/filterReducer'
import { connect } from 'react-redux'

function Filter(props) {
  const [filter, setFilter] = useState('')

  const handlerFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    props.filterInput(filter)
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

const mapsDispatchToProps = {
  filterInput
}

const ConnectedAnecdote = connect(
  null,
  mapsDispatchToProps
)(Filter)

export default ConnectedAnecdote