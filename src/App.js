import React from 'react';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#home" className="navbar-link">About Me</a>
          <a href="#main-techstacks" className="navbar-link">My Projects</a>
          <a href="#other-techstacks" className="navbar-link">Contact Me</a>
        </div>
      </nav>
      <Home />
      <footer className="profile-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Elaisha Mae Arias. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;