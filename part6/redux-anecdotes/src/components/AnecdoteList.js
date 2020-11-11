import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

function AnecdoteList(props) {
  const filterAnecdotesByStoreData = props.filter
  const anecdotes = props.anecdote.filter(
    anecdote => anecdote.content.includes(filterAnecdotesByStoreData)
  )

  const vote = (id) => {
    const filteredAnecdote = anecdotes.filter(anecdote => anecdote.id === id)
    props.addVote(filteredAnecdote)
    props.setNotification(notifyMessage(id),5)
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

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}
const ConnectedAnecdote = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdote