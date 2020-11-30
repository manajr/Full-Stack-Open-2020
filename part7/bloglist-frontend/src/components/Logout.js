import React from 'react'
import { useDispatch } from 'react-redux'
import { loggedUser } from '../reducer/loginReducer'

function Logout() {
    const dispatch = useDispatch()

    return (
        <>
            <button type='submit' onClick={() => {
                dispatch(loggedUser(null))
                window.localStorage.removeItem('loggedblogappuser')
            }}>logout</button>
        </>
    )
}

export default Logout
