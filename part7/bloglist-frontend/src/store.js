import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducer/blogsReducer'
import notificationReducer from './reducer/notificationReducer'
import loginReducer from './reducer/loginReducer'
import userListReducer from './reducer/userListReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer, 
    user: loginReducer,
    userList: userListReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
    applyMiddleware(thunk)
    )
)

export default store