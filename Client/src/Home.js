import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();
    const loggedInUserId = localStorage.getItem('loggedInUser');

    useEffect(() => {
        if (!loggedInUserId) {
            navigate("/login");
        } else {
            axios.get('http://localhost:9000/getTeams', { params: { user_id: loggedInUserId }})
                .then(res => setTeams(res.data))
                .catch(err => console.log(err));
        }
    }, [loggedInUserId, navigate]);

    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="form-container" style={{ width: '80%' }}>
            <h1>Home</h1>
            {loggedInUserId && (
                <>
                    <p><strong>Welcome! User ID: {loggedInUserId}</strong></p>
                    <button type="button" onClick={handleSignOut} style={{ backgroundColor: '#d9534f', width: 'auto', padding: '10px 20px' }}>
                        Sign Out
                    </button>
                </>
            )}

            <hr />
            <h3>Your Teams</h3>
            <ul>
                {teams.map(team => (
                    <li key={team._id}>
                        <Link to={`/team/${team._id}`}>{team.teamName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;