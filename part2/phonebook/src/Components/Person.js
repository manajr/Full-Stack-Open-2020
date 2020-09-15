import React from 'react'
import personService from '../services/persons'

const Person = ({item, tracker, state}) =>{

    const whenClick = (event) => {
        event.preventDefault()
        const nameFiltered = item.filter(n=>
            n.id.toString() === event.target.id)
        const deleteConf = window.confirm(`Delete ${nameFiltered[0]?.name} `)        

        if(deleteConf) {
            tracker(event.target.id)
            personService
            .deletePerson(event.target.id)
            .catch(error=>{
                state(`Information of ${nameFiltered[0]?.name} has already been removed from server`)
                setTimeout(()=> {
                    state(null)
                },5000)
            })
        }
    }

    return(
    <div>
    {item.map(data =>
        <div key={data.name}>
            <form>
                {data.name} {data.number} 
                 <button id={data.id} type='submit' onClick={whenClick}>delete</button> 
            </form>
        </div>)}
    </div>
    )
}

export default Person