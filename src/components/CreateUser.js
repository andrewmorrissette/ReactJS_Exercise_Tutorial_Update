import React, {useState} from 'react'
import axios from 'axios';

const CreateUser = ({updateUsers,isUpdate, ...props}) => {

    const [user, setUser] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if(!user){
            alert('Please add username')
            return
        }
        console.log("user Added",user)

        axios.post('http://localhost:5000/users/add',{username:user})
            .then(res => console.log(res.data))
            .catch( e => console.log(e.response))

        setUser('');
        updateUsers();
        isUpdate(true);

    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={user}
                        onChange={ e => setUser(e.target.value)}
                    />
                </div>
                <div className ="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser
