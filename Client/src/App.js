import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <nav className="navbar" style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        <Link to="/">Login</Link> | 
        <Link to="/signup"> Signup</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
export default App;