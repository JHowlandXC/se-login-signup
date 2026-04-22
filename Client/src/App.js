import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import CreateTeam from './CreateTeam';
import CreateTeamRoster from './CreateTeamRoster';
import CreateProject from './CreateProject';
import CreateUserStory from './CreateUserStory';
import ViewProjects from './ViewProjects';
import './styles.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/Home">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/create-team">Teams</Link>
        <Link to="/manage-roster">Rosters</Link>
        <Link to="/create-project">Projects</Link>
        <Link to="/user-story">Stories</Link>
        <Link to="/view-projects">View All</Link>
      </nav>

      <div className="main-container">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/manage-roster" element={<CreateTeamRoster />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/user-story" element={<CreateUserStory />} />
          <Route path="/view-projects" element={<ViewProjects />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;