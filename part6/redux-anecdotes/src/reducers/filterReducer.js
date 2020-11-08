const reducer = (state = '', action) => {
  switch(action.type) {
    case 'ALTER':
      return action.data
    default:
      return state
  }
}

export const filterInput = (data) => {
  return {
    type: 'ALTER',
    data
  }
}

export default reducer