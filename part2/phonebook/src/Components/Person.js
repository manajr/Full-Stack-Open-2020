import React from 'react'

const Person = (props) =>{
    const {item} = props
    return(
    <div>
    {item.map(data =>
          <div key={data.name}>{data.name} {data.number} </div>)}
    </div>
    )
}

export default Person