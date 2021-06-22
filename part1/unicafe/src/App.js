import React, { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}> {text} </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  return (
    <div>
      <p>
        Good {good}<br />
        Neutral {neutral}<br />
        Bad {bad}<br />
        All {total}<br />
        Average {(good - bad) / total}<br />
        Positive {good / total * 100} %<br />
      </p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
