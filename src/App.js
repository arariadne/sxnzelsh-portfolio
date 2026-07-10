import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Footer from './Footer';
import Resume from './Resume';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <i className="fas fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle smooth scrolling for in-page navigation links; if we're not on the
  // home route, navigate there first and scroll once it has rendered.
  const scrollToSection = (elementId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: elementId } });
      return;
    }
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state && location.state.scrollTo) {
      const id = location.state.scrollTo;
      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

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
          <Link to="/resume" className="navbar-link">
            Resume
          </Link>
        </div>
      </nav>
      <main>
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <Home />
                <Footer />
              </>
            )}
          />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;