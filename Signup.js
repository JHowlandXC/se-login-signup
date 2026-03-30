import React, { useState } from 'react';
import './styles.css';

function Signup() {
    const [formData, setFormData] = useState({ f_name: '', l_name: '', username: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const msg = await response.text();
        alert(msg);
    };

    return (
        <div className="container">
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" onChange={(e) => setFormData({...formData, f_name: e.target.value})} required />
                
                <label>Last Name:</label>
                <input type="text" onChange={(e) => setFormData({...formData, l_name: e.target.value})} required />
                
                <label>Username (UserID):</label>
                <input type="text" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                
                <label>Password:</label>
                <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                
                <button type="submit">Submit</button>
            </form>
            <a href="/login">Login Page</a>
        </div>
    );
}

export default Signup;