import usersService from '../services/user'

const userListReducer = (state = [] ,action) => {
    switch(action.type){
        case 'USER_LIST':
            return action.data
        default:
            return state
    }
}

export const initialUserList = () => {
    return async dispatch => {
        const users = await usersService.getUsers()
        dispatch({
            type: 'USER_LIST',
            data: users
        })
    }
}


export default userListReducer