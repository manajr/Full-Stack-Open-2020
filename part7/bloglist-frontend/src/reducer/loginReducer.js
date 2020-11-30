
const loginReducer = (state = null, action) => {
    switch(action.type) {
        case 'LOGGED':
            return action.data
        default:
            return state
    }
}

export const loggedUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'LOGGED',
            data: user
        })
    }
}

export default loginReducer