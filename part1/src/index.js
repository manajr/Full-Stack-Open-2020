import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return(
    <>
      <h1>{props.course_name} Course</h1>
    </>
  )
}
const Part = (props) => {
  return(
<p>{props.part_name} {props.part_exe_num}</p>
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
   return(<>
   <Part part_name={props.part_name[0]} part_exe_num={props.part_exe_num[0]}/>
   <Part part_name={props.part_name[1]} part_exe_num={props.part_exe_num[1]}/>
   <Part part_name={props.part_name[2]} part_exe_num={props.part_exe_num[2]}/>
   </>
   )
  }

  const Total = (props) =>{
    return(
    <div>
      <p>Number of exercises: {props.exercises_num}</p>
    </div>
    )
  }
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  return(
    <div>
    <Header course_name={course}/>
    <Content part_name={[part1, part2, part3]} part_exe_num={[exercises1, exercises2, exercises3]} />
    <Total exercises_num={exercises1 + exercises2 + exercises3} />
    </div>
  )
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
}

ReactDOM.render(<App />, document.getElementById('root'))