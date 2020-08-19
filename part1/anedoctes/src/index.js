import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <div>
    <button onClick={handleClick}>{text}</button>
  </div>
  )

const Display = ({mostVoted, anedocte}) =>{
  let greaterValue = 0;
  let index = 0;
  for(let i in mostVoted){
    if(greaterValue < mostVoted[i]){
      greaterValue = mostVoted[i]
      index = i
    }
  }
  return(
  <div>
    <h1>Anecdote with most votes</h1>
    <p>{anedocte[index]}</p>
  </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const randValue = () => setSelected(Math.floor(Math.random()*6))
  const [vote, setVote] = useState([0,0,0,0,0,0])
  console.log(vote)
  const voting = () =>{
  const copy = [...vote]
  copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <h1>Anedocte of the day</h1>
      {props.anecdotes[selected]}<br></br>
      has {vote[selected]} votes
      <Button handleClick={randValue} text='next anedocte' />
      <Button handleClick={voting} text={'vote'} />
      <Display mostVoted={vote} anedocte={props.anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)