import React from 'react';
import './App.css';
import Home from './Home';
import Footer from './Footer'; //Import the footer

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
      <Footer  />
    </div>
  );
}

export default App;