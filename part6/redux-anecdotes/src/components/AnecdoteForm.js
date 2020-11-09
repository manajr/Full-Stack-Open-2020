import React from 'react'
import { createAnecdote} from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

function AnecdoteForm() {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnec.value
    event.target.newAnec.value = ''

    dispatch(createAnecdote(content))
  
    const anecCreationMessage = `you added ${content}`
   dispatch(setNotification(anecCreationMessage, 1))
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
