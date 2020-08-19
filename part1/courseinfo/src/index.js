import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return(
    <>
      <h1>{props.course_name.name} Course</h1>
    </>
  )
}
const Part = (props) => {
  return(
<p>{props.part_name} {props.part_exe_num} exercises</p>
  )
}

const Content = (props) =>{
   /*var rows = [];
   for (var i = 0; i < (props.part_name).length; i++){
     const item = props.part_name[i]
     rows.push(
    <>
      <p>Course part - {props.part_name[i]} - has {props.part_exe_num[i]} exercises</p>
    </>
    )
   }
   return(rows)*/
  return(
    <>
    <Part part_name={props.part_name.parts[0].name} part_exe_num={props.part_name.parts[0].exercises}/>
    <Part part_name={props.part_name.parts[1].name} part_exe_num={props.part_name.parts[1].exercises}/>
    <Part part_name={props.part_name.parts[2].name} part_exe_num={props.part_name.parts[2].exercises}/>
    </>
   )
  }

const Total = (props) =>{
  return(
    <div>
    <p>Number of exercises: {props.exercises_num.parts[0].exercises + props.exercises_num.parts[1].exercises + props.exercises_num.parts[2].exercises}</p>
    </div>
  )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const History = ({allClicks}) => {
  if(allClicks.length === 0) {
    return(
      <div>
      the app is used by pressing buttons
      </div>
    )
  }
  return(
    <div>
    button press history: {allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  //Exercises Submission implementation
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  //Part 1c implementation
  const [counter, setCounter] = useState(0)
  const increaseByOne = () => setCounter(counter + 1)
  
  const setToZero = () => setCounter(0)

  const decreaseByOne = () => setCounter(counter - 1)

  //Part 1d implementation
  const[left, setLeft] = useState(0)
  const[right, setRight] = useState(0)
  const[allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  //Code below are for submission of Part 1 exercises 
  return(
    <div>
    <Header course_name={course}/>
    <Content part_name={course} />
    <Total exercises_num={course} />

    </div>
  )

  //Code below are for tests of Part 1, section a, b, c and d.

  //Part 1 - a
  /*return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )*/

  //Part 1 c and d
  /*return(
    <div>
    <Display counter={counter} />

    <Button 
    handleClick={increaseByOne} 
    text={'plus'}
    />
    
    <Button 
    handleClick={setToZero} 
    text={'zero'}
    />

    <Button 
    handleClick={decreaseByOne} 
    text={'minus'}
    />
    
    <h2>Part 4</h2>
    <div>
    <Display counter={left} />
    <Button handleClick={handleLeftClick} text={'Left'} />
    <Button handleClick={handleRightClick} text={'Right'} />
    <Display counter={right}/>
    <History allClicks={allClicks} />
    </div>

    </div>
  )*/
}

ReactDOM.render(<App />, document.getElementById('root'))