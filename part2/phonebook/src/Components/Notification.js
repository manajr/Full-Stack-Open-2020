import React from 'react'
import './Notification.css'

function Notification({message}) {
    if (message === null){
        return null
    }
    else if(message.includes('Information of')){
        return(
            <div className='message__error'>
                {message}
            </div>
        )
    }
    return (
        <div className='message__success'>
            {message}
        </div>
    )
}

export default Notification
