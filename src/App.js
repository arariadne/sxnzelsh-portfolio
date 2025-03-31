import React from 'react';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-link">Home</a>
          <a href="/contact" className="navbar-link">Contact</a>
        </div>
      </nav>
      <Home />
    </div>
  );
}

export default App;