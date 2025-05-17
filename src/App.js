import React from 'react';
import './App.css';
import Home from './Home';
import Footer from './Footer';

function App() {
  // Handle smooth scrolling for navigation links
  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-container">
          <span 
            onClick={() => scrollToSection('home')} 
            className="navbar-link"
          >
            About Me
          </span>
          <span 
            onClick={() => scrollToSection('projects')} 
            className="navbar-link"
          >
            My Projects
          </span>
          <span 
            onClick={() => scrollToSection('footer')} 
            className="navbar-link"
          >
            Contact Me
          </span>
        </div>
      </nav>
      <Home />
      <Footer />
    </div>
  );
}

export default App;
