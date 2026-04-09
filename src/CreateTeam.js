import React, { useState } from 'react';
import axios from 'axios';

function CreateTeam() {
    const [teamName, setTeamName] = useState('');

    const handleCreate = () => {
        axios.post('http://localhost:9000/createTeam', { teamName })
            .then(() => alert('Team Created Successfully!'))
            .catch(err => alert('Error: Team name might already exist'));
    };

    return (
        <div className="form-container">
            <h2>Create a New Team</h2>
            <input 
                type="text" 
                placeholder="Enter Team Name" 
                value={teamName} 
                onChange={(e) => setTeamName(e.target.value)} 
            />
            <button type="button" onClick={handleCreate}>Submit Team</button>
        </div>
    );
}

export default CreateTeam;