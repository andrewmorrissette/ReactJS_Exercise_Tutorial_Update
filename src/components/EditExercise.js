import React, { useState, useRef, useEffect  } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const EditExercise = ({usernames,...props}) => {

    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 22,
        date: new Date(),
        users: ['Andrew', 'George', 'Bethany']
    });

    useEffect(() => {
        axios.get( `http://localhost:5000/exercises/${props.match.params.id}`)
            .then(res => {
                setExercise(res.data)
            })
            .catch(e => console.log(e))
    },[])

    console.log(props, "props");
    console.log(exercise)

    

    const onSubmit = (e) => {
        
        e.preventDefault();

        if(!exercise.username || !exercise.description || !exercise.duration){
            alert('Please add username, description, and a duration')
            return
        }
        console.log("Exercise Updating");

        //Needs to happen on useEffect to get it when the comp is loading to supply dropdown w/ correct info
        axios.post(`http://localhost:5000/exercises/update/${props.match.params.id}`,exercise)
            .then(res => console.log(res.data));
        props.history.push('/');

    }

    const userInput = useRef(exercise.username);

    // if(isLoading) {
    //     return <p>Loading Users</p>
    // }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
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
                            selected={exercise.date ? new Date(exercise.date): null}
                            onChange={(date) => setExercise({...exercise, date})}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default withRouter(EditExercise);
