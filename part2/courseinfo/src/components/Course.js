import React from 'react'

// Course
const Course = ({ course }) => {
    return (
        <>
            <Header text={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

// Content
const Content = ({ parts }) => {
    return (
        <>
            {parts.map(p =>
                <Part key={p.id} part={p.name} exercise={p.exercises} />
            )}
            <Total parts={parts} />
        </>
    )
}


const Total = ({ parts }) => {
    // creates an array with num of each exercise
    const exercises = parts.map(p => p.exercises)
    // calculates the sum of exercises
    const total = exercises.reduce((s, p) => s + p)
    return (
        <h3>total of {total} exercises</h3>
    )
}

// Header
const Header = ({ text }) => {
    return (
            <h1>{text}</h1>
    )
}

// Part
const Part = ({ part, exercise }) => {
    return (
            <p> {part} {exercise} </p>
    )
}

export default Course