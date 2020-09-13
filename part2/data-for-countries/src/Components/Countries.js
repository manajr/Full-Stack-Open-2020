import React, { useState } from 'react'
import './Countries.css'

function Countries({item, values, weather}) {
    const [ itemOne, setItemOne ] = useState(item);
    const [ buttonWard, setButtonWard] = useState('');

    //console.log(itemOne)
    const showCountry = (event) =>{
        event.preventDefault()
        setItemOne(item.filter(name => name.name.includes(buttonWard)))
        values(item.filter(name => name.name.includes(buttonWard)))
    }

    const handleId = e =>{
        setButtonWard(e.target.id)
    }


    if(itemOne?.length > 1){
        return(
            <form onSubmit={showCountry}>
            <ul>
                <p>{item.map(name=>(<li key={name.name}>{name.name}
                <button id={name.name} type='submit' onClick={handleId}>show</button></li>))}</p>
            </ul>
            </form>
        )
    }
    //const itemOne = item[0]
    return (
        <div>
            <h1>{itemOne[0]?.name}</h1>
            <p>Capital {itemOne[0]?.capital}</p>
            <p>population {itemOne[0]?.population}</p>
            <h2>Languages</h2>
            <ul>
                {itemOne[0]?.languages?.map(lang => (
                    <li key={lang.name}>{lang.name}</li>
                ))}
            </ul>
            <img src={itemOne[0]?.flag} alt=''/>
            <div className='weather__container'>
                <h2>Weather in {weather.location?.name} </h2>
                <p><strong>temperature: </strong>{weather.current?.temperature} Celcius</p>
                <img src={weather.current?.weather_icons[[0]]} alt='' />
                    <p><strong>wind:</strong> {weather.current?.wind_speed} Kmph
                    direction {weather.current?.wind_dir}</p>
            </div>
        </div>
    )
}

export default Countries
