const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortingByVotes = (state) => {
  return state.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1
    }
    if (a.votes < b.votes) {
      return 1
    }
    return 0
  })
}

export default { getId, asObject, sortingByVotes }