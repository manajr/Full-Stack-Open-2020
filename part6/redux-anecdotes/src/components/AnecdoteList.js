import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

function AnecdoteList() {
  const filterAnecdotesByStoreData = useSelector(state =>
    state.filter)
  const anecdotes = useSelector(state => state.anecdote.filter(
    anecdote => anecdote.content.includes(filterAnecdotesByStoreData)
  ))
  const dispatch = useDispatch()

  const vote = (id) => {
    const filteredAnecdote = anecdotes.filter(anecdote => anecdote.id === id)
    dispatch(addVote(filteredAnecdote))
    dispatch(setNotification(notifyMessage(id),2))
  }

  const notifyMessage = (id) => {
    const filteredAnec = anecdotes.filter(anecdote =>
     anecdote.id === id)[0]
     return `you voted in '${filteredAnec.content}'`
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
