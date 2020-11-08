import React from 'react'
import { createAnecdote} from '../reducers/anecdoteReducer'
import { addToStore } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

function AnecdoteForm() {
  const dispatch = useDispatch()
  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnec.value
    event.target.newAnec.value = ''
    dispatch(createAnecdote(content))
  
    const anecCreationMessage = `you added ${content}`
  
    dispatch(addToStore({ notification: anecCreationMessage }))
    setTimeout(() => {
      dispatch(addToStore({ notification: '' }))
    }, 2000)
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={newAnecdote}>
          <div><input name="newAnec"/></div>
          <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm
