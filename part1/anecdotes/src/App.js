import { logDOM } from '@testing-library/react'
import React, { useState } from 'react'

// Header
const Title = ({ title }) => {
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

// Anecdote
const Anecdote = ({ text, number}) => (
  <>
    <tr>
      <td>
        {text}
        </td>
      </tr>
    <tr>
      <td>
        has {number} votes
      </td>
    </tr>
  </>
)

// Most popular anecdote
const TopAnecdote = ({anecdotes, points}) => {
  let mostVotes = 0
  let topAnecdote = 0
  
  // loops through votes for each anecdote
  points.forEach((element, index) => { 
    if (element >= mostVotes) {
      mostVotes = element
      topAnecdote = index
    }
  }) 

  // if no votes have been cast
  if(mostVotes === 0) {
    return (
      <tr><td>No votes yet</td></tr>
    )
  }

  return (
    <Anecdote text={anecdotes[topAnecdote]} number={points[topAnecdote]} />
  )
}

//App
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0))

  const addPoint = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>

      <Title title="Anecdote of the Day" />
      <table>
        <tbody>
          <Anecdote text={anecdotes[selected]} number={points[selected]} />
        </tbody>
      </table>
      <Button text='vote' onClick={addPoint} />
      <Button text='next anecdote' onClick={() => setSelected(Math.floor(Math.random() * 7))} />

      <Title title="Anecdote with most votes" />
      <table>
        <tbody>
          <TopAnecdote anecdotes={anecdotes} points={[...points]} />
        </tbody>
      </table>

    </div>
  )
}

export default App