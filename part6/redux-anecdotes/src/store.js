import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notificationReducer'  
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdote: anecReducer,
  notification: notifReducer,
  filter: filterReducer
})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ),
)

export default store