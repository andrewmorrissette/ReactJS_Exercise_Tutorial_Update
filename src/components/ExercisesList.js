import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Exercise = ({exercise, ...props}) => {
    //refactor: Instead of <a> use button & Style
    return (
        <tr>
            <td>{exercise.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0,10)}</td>
            <td>
                <Link to={`/edit/${exercise._id}`}>Edit</Link> | <a href="#" onClick={() => {props.deleteExercise(exercise._id)}}>Delete</a>
            </td>
        </tr>
    )
}


const ExercisesList = () => {

    const [exercises, setExercises] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/exercises')
            .then(res => setExercises(res.data))
            .catch(e => console.log(e))
    })

    const deleteExercise = (id) => {
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(res => console.log(res.data))
            .then(setExercises(exercises.filter(el => el._id !== id)))
    }


    
    const exerciseList = () =>{
        return exercises.map(currentExercise => {
            return <Exercise 
                exercise={currentExercise} 
                deleteExercise={deleteExercise} 
                key={currentExercise._id}/>
        })
    }

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList
