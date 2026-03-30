import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        axios.get('http://localhost:9000/getUser', { params: { username, password }})
            .then((res) => {
                if (res.data) alert('Login Successful');
                else alert('Wrong Credentials');
            })
            .catch((err) => alert('Error in Login'));
    };

    return (
        <div className="form-container">
            <h1>Welcome</h1>
            <input type="text" placeholder="UserID" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={handleLogin}>Login</button>
        </div>
    );
}
export default Login;