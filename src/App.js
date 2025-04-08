import React from 'react';
import './App.css';
import Home from './Home';
import Footer from './Footer';

function App() {
  const scrollToFooter = () => {
    const footer = document.querySelector('.profile-footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-link">Home</a>
          <a href="#" className="navbar-link" onClick={scrollToFooter}>Contact</a>
        </div>
      </nav>
      <Home />
      <Footer />
    </div>
  );
}

export default App;