import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import CreateTeam from './CreateTeam';
import CreateProject from './CreateProject';
import ViewProjects from './ViewProjects';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
        <Link to="/">Login</Link> | <Link to="/signup">Signup</Link> | 
        <Link to="/create-team">Create Team</Link> | 
        <Link to="/create-project">Create Project</Link> | 
        <Link to="/view-projects">View Projects</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/view-projects" element={<ViewProjects />} />
      </Routes>
    </Router>
  );
}