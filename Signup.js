import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (event) => {
        axios.post('http://localhost:9000/createUser', { firstName, lastName, username, password })
            .then((res) => alert('Signup Successful!'))
            .catch((err) => alert('Error: ' + err.response.data));
    };

    return (
        <div className="form-container">
            <h1>SignUp</h1>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="text" placeholder="UserID" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={handleSignUp}>Signup</button>
        </div>
    );
}
export default Signup;