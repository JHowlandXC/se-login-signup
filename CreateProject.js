import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateProject() {
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', productOwner: '', manager: '', team: '' });

    useEffect(() => {
        axios.get('http://localhost:9000/allUsers').then(res => setUsers(res.data));
        axios.get('http://localhost:9000/getTeams').then(res => setTeams(res.data));
    }, []);

    const handleSubmit = () => {
        axios.post('http://localhost:9000/createProject', form)
            .then(() => alert("Project Created!"))
            .catch(err => console.log(err));
    };

    return (
        <div className="form-container">
            <h2>Create Project</h2>
            <input placeholder="Project Name" onChange={e => setForm({...form, name: e.target.value})} />
            <textarea placeholder="Description" onChange={e => setForm({...form, description: e.target.value})} />
            
            <label>Product Owner:</label>
            <select onChange={e => setForm({...form, productOwner: e.target.value})}>
                <option value="">Select User</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.firstName} {u.lastName}</option>)}
            </select>

            <label>Manager:</label>
            <select onChange={e => setForm({...form, manager: e.target.value})}>
                <option value="">Select User</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.firstName} {u.lastName}</option>)}
            </select>

            <label>Team:</label>
            <select onChange={e => setForm({...form, team: e.target.value})}>
                <option value="">Select Team</option>
                {teams.map(t => <option key={t._id} value={t._id}>{t.teamName}</option>)}
            </select>

            <button onClick={handleSubmit}>Create Project</button>
        </div>
    );
}