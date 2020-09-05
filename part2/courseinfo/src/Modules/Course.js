import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((s,p) => s + p.exercises, 0)
  return(
    <p><b>Number of exercises {sum}</b></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    course.parts.map(part =>
  <Part key={part.id} part={part}/>
    )
  )
}

const Course = ({courses}) => {
  return(
    courses.map(course =>
      <div key={course.id}>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
      </div>
    )
  )
}
export default Course
