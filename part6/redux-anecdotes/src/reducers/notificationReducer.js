let HOLD_SETTIMEOUT_FUNCTION;
let CHECK_ARRAY = []

const reducer = (state = '', action) => {
  switch(action.type) {
  case 'NOTIFY':
    return action.notification
  default:
    return state
  }
}

function setDelay(callback, time) {
  HOLD_SETTIMEOUT_FUNCTION = setTimeout(callback, time*1000);
}

export const setNotification = (notification, time) => {
  if(CHECK_ARRAY !== notification){
    clearTimeout(HOLD_SETTIMEOUT_FUNCTION)
  }

  return async dispatch => {
    HOLD_SETTIMEOUT_FUNCTION = setTimeout(() => {
      dispatch({
        type:'NOTIFY',
        notification: ''
      })
    }, time*1000)

    CHECK_ARRAY.unshift(notification)
    
    dispatch({
      type: 'NOTIFY', 
      notification: notification
    })
  }
}

export default reducer