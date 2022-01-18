import React, { useState } from 'react'

// Header
const Title = ({title}) => {
  return (
      <h1>{title}</h1>
  )
}

// Button
const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

// Statistics
const Statistics = ({good, bad, neutral}) => {
  var all = good + neutral + bad

  if (all === 0) {      // if no data
    return (
      <tr>
        <td>
          No feedback given
        </td>
      </tr>
    )
  }

  return(             
    <>
    <StatisticLine text='good' value={good} />
    <StatisticLine text='neutral' value={neutral} />
    <StatisticLine text='bad' value={bad} />
    <StatisticLine text='all' value={all} />
    <StatisticLine text='average' value={((good - bad) / all)} />
    <StatisticLinePercent text='positive' value={((good * 100) / all)} />
  </>
  )
}

// Text and a value
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

// Text and value (with % after the value)
const StatisticLinePercent = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} %</td>
    </tr>
  )
}

// App
const App = () => {
  const mainTitle = 'give feedback'
  const title = 'statistics'

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title={mainTitle} />
      <Button text='good' onClick={() => setGood(good + 1)} />
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' onClick={() => setBad(bad+1)} />

      <Title title={title} />
      <table>
        <tbody>
          <Statistics good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </div>
    
  )
}

export default App