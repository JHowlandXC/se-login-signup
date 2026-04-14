import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import CreateTeam from './CreateTeam';
import CreateProject from './CreateProject';
import ViewProjects from './ViewProjects';
import './styles.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/signup">Signup Users</Link>
        <Link to="/create-team">Create Team</Link>
        <Link to="/create-project">Create Project</Link>
        <Link to="/view-projects">View Projects</Link>
      </nav>

      <div className="main-container">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/view-projects" element={<ViewProjects />} />
          <Route path="/" element={<h2 style={{textAlign:'center'}}>Select a task from the menu</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;