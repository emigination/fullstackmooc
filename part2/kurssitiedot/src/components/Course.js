import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part part={part} key={part.id} />)}
    </div>
  )
}

const Total = (props) => {
  const sum = props.parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <div>
      <p><b>Total of exercises {sum}</b></p>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

export default Course