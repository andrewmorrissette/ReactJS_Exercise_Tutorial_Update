import React, { useState, useEffect} from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar.js";
import ExercisesList from "./components/ExercisesList.js";
import EditExercise from "./components/EditExercise.js";
import CreateExercise from "./components/CreateExercise.js";
import CreateUser from "./components/CreateUser.js";

function App() {

  const [users,setUsers] = useState([]);
  const [isUpdated,setUpdate] = useState(false);

  const getUsers = async () =>{
    const usernames = []
    axios.get('http://localhost:5000/users/')
          .then(res => res.data.map(data => usernames.push(data.username)))
          .then(setUsers(usernames))
          .catch( e => console.log(e.response))

  }

  useEffect(() => {
    getUsers();
  },[isUpdated])


  return (
  <Router>
    <div className="container">
      <Navbar />
      <br/>
      <Route path='/' exact component={ExercisesList} />
      <Route path='/edit/:id'>
        <EditExercise usernames={users}/>
      </Route>
      <Route path='/create'>
        <CreateExercise usernames={users}/>
      </Route>
      <Route path='/create'/>
      <Route path='/user'>
        <CreateUser updateUsers={getUsers} isUpdate={setUpdate}/>
      </Route>
    </div>
  </Router>
  )
}

export default App;
