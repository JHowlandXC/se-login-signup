import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// TEMPORARY: Simple components to test routing
const Home = () => <div className="form-container"><h1>Home Page</h1></div>;
const Login = () => <div className="form-container"><h1>Login Page</h1></div>;
const Signup = () => <div className="form-container"><h1>Signup Page</h1></div>;

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white', display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: 'white' }}>Home</Link>
        <Link to="/login" style={{ color: 'white' }}>Login</Link>
        <Link to="/signup" style={{ color: 'white' }}>Signup</Link>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;