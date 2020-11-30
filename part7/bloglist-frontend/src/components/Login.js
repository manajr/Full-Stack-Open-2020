import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { loggedUser } from '../reducer/loginReducer'
import { notifyMessage } from '../reducer/notificationReducer'
import LoginForm from './LoginForm'
import { useDispatch } from 'react-redux'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({ username, password })

            dispatch(notifyMessage(`Welcome ${user.name}`,5))

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
            dispatch(loggedUser(user))
        } catch (err) {
            console.log(err)
            dispatch(notifyMessage('Wrong credentials', 5))
        }
    }
    return (
        <div>
            <LoginForm handleLogin={handleLogin}
            username={username} password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            />
        </div>
    )
}

export default Login
