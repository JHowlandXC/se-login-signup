import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateUserStory() {
    const [projects, setProjects] = useState([]);
    const [user_story, setUserStory] = useState('');
    const [proj_id, setProjId] = useState('');
    const [priority, setPriority] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:9000/getProjects').then(res => setProjects(res.data));
    }, []);

    const handleSaveStory = () => {
        if (!proj_id || !user_story) {
            alert("Please select a project and enter a description.");
            return;
        }

        axios.post('http://localhost:9000/createUserStory', { user_story, proj_id, priority })
            .then(() => alert("User Story Created!"))
            .catch(err => alert("Error creating story"));
    };

    return (
        <div className="form-container">
            <h2>Create User Story</h2>
            
            <label>Project:</label>
            <select onChange={(e) => setProjId(e.target.value)}>
                <option value="">-- Select Project --</option>
                {projects.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                ))}
            </select>

            <label>Description:</label>
            <textarea 
                placeholder="Enter user story..." 
                value={user_story} 
                onChange={(e) => setUserStory(e.target.value)}
            />

            <label>Priority:</label>
            <input 
                type="number" 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)} 
            />

            <button type="button" onClick={handleSaveStory}>Save User Story</button>
        </div>
    );
}

export default CreateUserStory;