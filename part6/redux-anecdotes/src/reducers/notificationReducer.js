const reducer = (state = '', action) => {
  let res
  switch(action.type) {
  case 'ADD':
    res = action.notification.notification
    return state = res
  case 'NOTEFY_VOTE':
    return action.notification
  default:
    return state
  }
}

export const addToStore = (notification) => ({
  type: 'ADD',
  notification
})

export const notifyWhenVote = (id, notification) => {
  return {
    type: 'NOTEFY_VOTE', 
    id: { id },
    notification
  }
}

export default reducer