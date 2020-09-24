import React from 'react'

const Person = ({item, clickDeleteHandler}) =>{
    return(
    <div>
    {item.map(data =>
        <div key={data.name}>
            <form>
                {data.name} {data.number} 
                 <button id={data.id} type='submit' onClick={clickDeleteHandler}>delete</button> 
            </form>
        </div>)}
    </div>
    )
}

export default Person