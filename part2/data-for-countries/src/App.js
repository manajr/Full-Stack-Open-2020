import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Countries from './Components/Countries'

function App() {
  const [ search, setSearch ] = useState([])
  const [ newSearch, setNewSearch] = useState('')
  const [ response, setResponse ] = useState('')
  const [selectedName, setSelectedName ] = useState();
  const [ weather, setWeather ] = useState([]);

  useEffect(()=>{
    const api_key = process.env.REACT_APP_API_KEY
    if(selectedName != undefined){
      axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${selectedName[0]?.name}`)
      .then(response=> {
        console.log('weather', response.data.current.temperature, selectedName[0]?.name)
        setWeather(response.data)
      }
      )
    }
  }, selectedName)
  
  useEffect(() => {

    const searchCountry = (data) =>{
    let temp = []
    const responseName = data
    .map(country=>(country.name))
    .filter(name=>name.toUpperCase().includes(newSearch.toUpperCase()))
    for (let i of data){
      for (let j of responseName){
        if (i.name.includes(j)){
          temp.push(i)
        }
        }
   
    }
    return(temp)
  }
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      //Return an list of objects which less than 10 elements
      if ( newSearch !== '' ){
        const data = searchCountry(response.data)
        if (data.length > 10){
          setResponse('Too many countries to search')
        }
        else{
          setSearch(data)
          setResponse('')
        }
      }
    })
  }, [newSearch])

 // console.log(search)

  const handleCountrieChange = (event) => {
    setNewSearch(event.target.value)
  }

  const values = (updateValue) => {
    setSelectedName(updateValue)
  }
  
  return (
    <div>
      <form>
        <label>finding countries</label>
        <input name='countries' onChange={handleCountrieChange} />
      </form>
      {response===''? <Countries item={search} values={values} weather={weather}/>: 'Too many countries to search'}
    </div>
  )
}

export default App;
