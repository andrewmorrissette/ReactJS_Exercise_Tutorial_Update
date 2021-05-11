import React, { useState, useRef, useEffect  } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const CreateExercise = ({usernames,...props}) => {

    console.log(props, "props");

    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 22,
        date: new Date(),
        users: ['Andrew', 'George', 'Bethany']
    });

    const onSubmit = (e) => {
        
        e.preventDefault();

        if(!exercise.username || !exercise.description || !exercise.duration){
            alert('Please add username, description, and a duration')
            return
        }
        console.log("Exercise Created");

        //Needs to happen on useEffect to get it when the comp is loading to supply dropdown w/ correct info
        axios.post('http://localhost:5000/exercises/add',{
            username:exercise.username,
            description:exercise.description,
            duration:exercise.duration,
            date:exercise.date
        }).then((res) => console.log(res))
            .catch((e) => console.log(e.response))

        props.history.push('/');

    }

    const userInput = useRef(exercise.username);

    // if(isLoading) {
    //     return <p>Loading Users</p>
    // }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select ref={userInput}
                        required
                        className="form-control"
                        value={exercise.username}
                        onChange={(e) => setExercise({...exercise, username: e.target.value})}>
                        {usernames.length > 0 && usernames.map( (name) => {
                            return <option
                            key={name}
                            value={name}>{name}
                            </option>;
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description: </label>
                    <input type="text"
                    required
                    className="form-control"
                    value={exercise.description}
                    onChange={(e) => setExercise({...exercise, description: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={exercise.duration}
                        onChange={(e) => setExercise({...exercise, duration: e.target.value})} 
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={exercise.date}
                            onChange={(date) => setExercise({...exercise, date})}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default withRouter(CreateExercise);
