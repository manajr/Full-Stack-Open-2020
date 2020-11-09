import utils from '../utils/utils'
import anecdoteService from '../services/anecdote'
//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        votes: noteToChange.votes + 1
      }
      const newState = state.map(aned => aned.id !== id ? aned : changedNote)
      return utils.sortingByVotes(newState)
    case 'NEW_ANEC':
      const newAnecdoteToStore = action.data
      return state.concat(newAnecdoteToStore)
    case 'INITIAL_ANEC':
      return action.data
    default:
      return utils.sortingByVotes(state)
  }
}

export const addVote = (object) => {
  return async dispatch => {
    const response = await anecdoteService.updateVote(object)
      dispatch({
        type: 'VOTE',
        data: response.data.id
    })
  }
}

export const createAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
      dispatch({
        type: 'NEW_ANEC',
        data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
      dispatch({
        type: 'INITIAL_ANEC',
        data: utils.sortingByVotes(anecdotes)
    })
  }
}

export default reducer