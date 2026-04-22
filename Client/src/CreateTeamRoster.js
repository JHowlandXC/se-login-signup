import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function CreateTeamRoster() {
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/allUsers').then(res => setUsers(res.data));
        axios.get('http://localhost:9000/getTeams').then(res => setTeams(res.data));
    }, []);

    const userOptions = users.map(user => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user._id
    }));

    const handleSubmit = () => {
        if (!selectedTeam || selectedMembers.length === 0) {
            alert("Please select a team and at least one member.");
            return;
        }

        const memberIds = selectedMembers.map(m => m.value);
        axios.post('http://localhost:9000/addToRoster', { team_id: selectedTeam, members: memberIds })
            .then(() => alert('Team Roster Updated Successfully!'))
            .catch(err => alert('Error updating roster'));
    };

    return (
        <div className="form-container">
            <h2>Manage Team Roster</h2>
            
            <label>Pick a Team:</label>
            <select onChange={(e) => setSelectedTeam(e.target.value)} value={selectedTeam}>
                <option value="">-- Select Team --</option>
                {teams.map(team => (
                    <option key={team._id} value={team._id}>{team.teamName}</option>
                ))}
            </select>

            <label>Select Members:</label>
            <Select
                isMulti
                options={userOptions}
                value={selectedMembers}
                onChange={setSelectedMembers}
                placeholder="Search and select users..."
            />

            <button type="button" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                Add Members to Team
            </button>
        </div>
    );
}

export default CreateTeamRoster;