import React, { useState } from 'react';
import './styles.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const message = await response.text();
        alert(message); // Displays "Login Successful!" or "Login Failed"
    };

    return (
        <div className="container">
            <h1>Welcome</h1>
            <h2>Login with UserID and Password</h2>
            <form onSubmit={handleLogin}>
                <label>UserID:</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} required />
                
                <label>Password:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                
                <button type="submit">Submit</button>
            </form>
            <a href="/signup">SignUp</a>
        </div>
    );
}

export default Login;