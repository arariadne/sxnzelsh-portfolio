import React from 'react';
import './App.css';
import Home from './Home';
import Footer from './Footer';

function App() {
  const profile = {
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    linkedin: "https://www.linkedin.com/in/elaisha-arias-ab0b81237/"
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-link">Home</a>
          <a href="/contact" className="navbar-link">Contact</a>
        </div>
      </nav>
      <Home />
      <Footer email={profile.email} phone={profile.phone} linkedin={profile.linkedin} />
    </div>
  );
}

export default App;