import React from 'react'
import './LoggerMessage.css'

const ErrorMessage = ({message}) => {
  if (!message){
    return null
  }
  else if (message.includes('Wrong')) {
    return(
      <div className='red'>
        <p>{message}</p>
      </div>
    )
  }
  else if (message.includes('added') || message.includes('Welcome') || message.includes('deleted') ){
    return(
      <div className='green'>
        <p>{message}</p>
      </div>
    )
  }
}

export default ErrorMessage