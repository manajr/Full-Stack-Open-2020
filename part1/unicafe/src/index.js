import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*const Statistics = ({values}) => {
  const all = values.reduce((a,b) => a+b, 0)
  const average = (values[0] - values[2])/all
  const positive = (values[0]/all)

  if (Number.isNaN(average)){
    return(
    <div>
      <p>No feedback given</p>
    </div>  
    )
  }
  return(
    <div>
      good {values[0]} <br></br>
      neutral {values[1]} <br></br>
      bad {values[2]} <br></br>
      all {all} <br></br>
      average {average.toFixed(2)} <br></br>
      positive {positive.toFixed(2)} %
    </div>
  )
}*/

const Statistics = ({values, text}) => {
  const inner_value = Object.values(values)
  //const all = values.reduce((a,b) => a+b, 0)
  //const average = (values[0] - values[2])/all
  //const positive = (values[0]/all)

  if (text === 'average'){
    const all = inner_value.reduce((a,b) => a + b, 0 )
    return(
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{((values[0] - values[2])/all).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    )
  }
  else if(text === 'positive'){
    const all = inner_value.reduce((a,b) => a + b, 0 )
    return(
      <table>
        <tbody>
        <tr>
          <td>{text}</td>
          <td>{(values[0]/all).toFixed(3)*100} %</td>
        </tr>
        </tbody>
      </table>
    )
  }
  else if(text === 'good' || text === 'neutral' || text === 'bad'){
   return(
     <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{values}</td>
        </tr>
      </tbody>
     </table>
   )
  }
  else if(text === 'all'){
    const all = inner_value.reduce((a,b) => a + b, 0 )
    return(
      <table>
        <tbody>
        <tr>
        <td>all</td>
        <td>{all}</td>
        </tr>
        </tbody>
      </table>
      
    )
  }
}

const Button = ({handleClick, text, value}) =>(
  <>
    <button onClick={handleClick}>{text}</button>
  </>
  )

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  if(good === 0 && neutral === 0 && bad === 0){
    return(
      <div>
        <h1>give feedback</h1>
          <div>
            <Button handleClick={() => setGood(good + 1)} text='Good' value={good}/>
            <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' value={neutral}/>   
            <Button handleClick={() => setBad(bad + 1)} text='Bad' value={bad}/>
          </div>
        <h1>statistics</h1>
          <p>No feedback given</p>
      </div>
    )
  }
  else{
    return(
      <div>
        <h1>give feedback</h1>
          <div>

          <Button handleClick={() => setGood(good + 1)} text='Good' value={good}/>
          <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' value={neutral}/>
          <Button handleClick={() => setBad(bad + 1)} text='Bad' value={bad}/>

          </div>
        <h1>statistics</h1>
        <Statistics values={good} text='good'/>
        <Statistics values={neutral} text='neutral'/>
        <Statistics values={bad} text='bad'/>
        <Statistics values={[good,neutral, bad]} text='all'/>
        <Statistics values={[good, neutral, bad]} text='average'/>
        <Statistics values={[good, neutral, bad]} text='positive'/>
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
