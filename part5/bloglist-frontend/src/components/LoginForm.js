import React from 'react'

const LoginForm = ({ handleLogin, username, password, 
  handleUsernameChange, handlePasswordChange}) => {
  
  return (
    <div>
    <h2>log in to application</h2>
    <form className="loginForm" onSubmit={handleLogin}>
      <div>
        username  
        <input className='loginForm__Username' type='text' value={username}
         onChange={handleUsernameChange} name='username'/>
      </div>
      <div>
        password 
        <input className='loginForm__Password'
        value={password} type="password" name='password' onChange={handlePasswordChange}/>
      </div>
      <input className='loginForm__btn' type="submit"
      value="login"/>
    </form>
    </div>
  )
}


export default LoginForm