let HOLD_SETTIMEOUT_FUNCTION;

const notificationReducer = (state='', action) => {
    switch(action.type) {
        case 'NOTIFY':
            return action.notification
        default:
            return state
    }
}

export const notifyMessage = (notification, time) => {
    clearTimeout(HOLD_SETTIMEOUT_FUNCTION)

    return async dispatch => {
        HOLD_SETTIMEOUT_FUNCTION = setTimeout(() => {
            dispatch({
                type: 'NOTIFY',
                notification: ''
            })
        }, time*1000)

        dispatch({
            type: 'NOTIFY',
            notification: notification
        })
    }
}    
export default notificationReducer