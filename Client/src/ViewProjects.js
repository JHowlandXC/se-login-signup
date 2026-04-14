import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/getProjects').then(res => setProjects(res.data));
    }, []);

    return (
        <div className="view-container">
            <h2>Project Table</h2>
            <table className="project-table">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Product Owner</th>
                        <th>Manager</th>
                        <th>Team Name</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(p => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td>{p.productOwner?.firstName} {p.productOwner?.lastName}</td>
                            <td>{p.manager?.firstName} {p.manager?.lastName}</td>
                            <td>{p.team?.teamName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewProjects;