import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        axios.get('http://localhost:9000/getUser', { params: { username, password }})
            .then((res) => {
                if (res.data) {
                    alert('Login Successful');
                    localStorage.clear();
                    localStorage.setItem('loggedInUser', res.data._id);
                    navigate("/Home");
                } else {
                    alert('Wrong Credentials');
                }
            })
            .catch((err) => alert('Error in Login'));
    };

    return (
        <div className="form-container">
            <h1>Welcome</h1>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="UserID" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;