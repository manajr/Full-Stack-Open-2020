const reducer = (state = '', action) => {
  let res
  switch(action.type) {
  case 'NOTIFY':
    return action.notification
  default:
    return state
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    await setTimeout(() => {
      dispatch({
        type:'NOTIFY',
        notification: ''
      })
    }, time*1000)

        dispatch({
      type: 'NOTIFY', 
      notification: notification
    })
  }
}
export default reducer