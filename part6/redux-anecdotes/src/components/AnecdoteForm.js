import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

function AnecdoteForm(props) {

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnec.value
    event.target.newAnec.value = ''

    props.createAnecdote(content)

    const anecCreationMessage = `you added ${content}`
    props.setNotification(anecCreationMessage, 1)
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdotes
