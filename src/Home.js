import React from 'react';
import './Home.css';
import InteractiveBackground from './InteractiveBackground';

function Home() {
  return (
    <>
      {/* Main Home Section */}
      <section id="home" className="home-container">
      <div className="home-background"></div>
      <InteractiveBackground />
      <div className="home-content">
          {/* Profile Image */}
          <div className="profile-section">
            <div className="profile-image-container">
              <img 
                src="https://i.pinimg.com/736x/f9/e0/0f/f9e00f9615e0d86a5a7f02caebd00486.jpg"  
                alt="Elaisha Mae Arias" 
                className="profile-image" 
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="content-section">
            <p className="greeting">Hi! I'm</p>
            <h1 className="name">ELAISHA MAE M. ARIAS</h1>
            <h2 className="title">an aspiring UI/UX Designer and Fullstack Developer</h2>
            
            <p className="bio">
              As a highly motivated and detail-oriented aspiring UI/UX Designer and Frontend
              Developer, I am dedicated to ensuring the quality, functionality, and aesthetic appeal of 
              software applications. I am seeking a position where I can leverage my expertise, 
              analytical skills, and passion for delivering exceptional user experiences to contribute to 
              innovative software solutions.
            </p>

            {/* Social Links */}
            <div className="social-links">
              <a href="https://github.com/arariadne" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-github"></i>
                <span>github.com/arariadne</span>
              </a>
              <a href="https://linkedin.com/in/elaisha-arias" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin"></i>
                <span>linkedin.com/in/elaisha-arias</span>
              </a>
              <a href="https://facebook.com/elaisha.arias" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-facebook"></i>
                <span>facebook.com/elaisha.arias</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Techstacks Section */}
      <section id="main-techstacks" className="techstacks-section">
        <div className="container">
          <h2 className="section-title">MY MAIN TECHSTACKS</h2>
          <div className="techstack-grid">
            {/* First row - Main Techstacks */}
            <div className="techstack-row">
              <div className="techstack-item">
                <div className="tech-icon">
                  <img src="https://icon.icepanel.io/Technology/svg/React.svg" alt="ReactJS" className="tech-logo" />
                </div>
                <span>REACTJS</span>
              </div>
              <div className="techstack-item">
                <div className="tech-icon">
                  <img src="https://icon.icepanel.io/Technology/svg/Vite.js.svg" alt="ViteJS" className="tech-logo" />
                </div>
                <span>VITEJS</span>
              </div>
              <div className="techstack-item">
                <div className="tech-icon">
                  <img src="https://icon.icepanel.io/Technology/svg/Node.js.svg" alt="NodeJS" className="tech-logo" />
                </div>
                <span>NODEJS</span>
              </div>
            </div>
            {/* Second row - Main Techstacks */}
            <div className="techstack-row">
              <div className="techstack-item">
                <div className="tech-icon">
                  <img src="https://icon.icepanel.io/Technology/svg/Firebase.svg" alt="Firebase" className="tech-logo" />
                </div>
                <span>FIREBASE</span>
              </div>
              <div className="techstack-item">
                <div className="tech-icon">
                  <img src="https://icon.icepanel.io/Technology/svg/Sass.svg" alt="SASS/SCSS" className="tech-logo" />
                </div>
                <span>SASS/SCSS</span>
              </div>
              <div className="techstack-item">
                 <div className="tech-icon html-css-js">
                <i className="fas fa-code"></i>
                </div>
                <span>HTML/CSS/JS</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Other Techstacks Section */}
      <section id="other-techstacks" className="other-techstacks-section">
        <div className="container">
          <h2 className="section-title">OTHER TECHSTACKS</h2>
          <div className="other-techstack-container">
            <div className="other-techstack-row">
              <div className="techstack-item">
                <div className="tech-icon arduino">
                  <img src="https://icon.icepanel.io/Technology/svg/Arduino.svg" alt="Arduino" className="tech-logo" />
                </div>
              </div>
              <div className="techstack-item">
                <div className="tech-icon c">
                  <img src="https://icon.icepanel.io/Technology/svg/C.svg" alt="C" className="tech-logo" />
                </div>
              </div>
              <div className="techstack-item">
                <div className="tech-icon csharp">
                  <img src="https://icon.icepanel.io/Technology/svg/C%23-%28CSharp%29.svg" alt="C#" className="tech-logo" />
                </div>
              </div>
              <div className="techstack-item">
                <div className="tech-icon cpp">
                  <img src="https://icon.icepanel.io/Technology/svg/C%2B%2B-%28CPlusPlus%29.svg" alt="C++" className="tech-logo" />
                </div>
              </div>
              <div className="techstack-item">
                <div className="tech-icon nextjs">
                  <img src="https://icon.icepanel.io/Technology/png-shadow-512/Next.js.png" alt="NextJS" className="tech-logo" />
                </div>
              </div>
              <div className="techstack-item">
                <div className="tech-icon java">
                  <img src="https://icon.icepanel.io/Technology/svg/Java.svg" alt="Java" className="tech-logo" />
                </div>
              </div>
              <div className="techstack-item">
                <div className="tech-icon graphql">
                  <img src="https://icon.icepanel.io/Technology/svg/GraphQL.svg" className="tech-logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">MY PROJECTS</h2>
          <div className="projects-grid">
            {/* Project Card 1 - Gourmet Gamble */}
            <div className="project-card">
              <div className="project-image">
                <img src="https://i.pinimg.com/736x/67/d3/0e/67d30e658e9039a2aec79c3f490c7b26.jpg" alt="Gourmet Gamble" className="project-img-icon" />
              </div>
              <h3 className="project-title">Gourmet Gamble</h3>
              <p className="project-description">
                A smart web platform built with React.js and Firebase that helps users turn
                everyday ingredients into practical, delicious meals. By entering what they have, 
                users get tailored recipe suggestions that reduce food waste and promote sustainable cooking.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Firebase</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/LoydAMT/gourmetgamble0" target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fas fa-code"></i> View Code
                </a>
                <a href="https://gourmetgamble0.vercel.app" target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
              </div>
            </div>

            {/* Project Card 2 - Swiftsail */}
            <div className="project-card">
              <div className="project-image">
                <img src="https://i.pinimg.com/736x/4b/f2/eb/4bf2ebce5bc269ef241d7280dbacf315.jpg" alt="Swiftsail" className="project-img-icon" />
              </div>
              <h3 className="project-title">Swiftsail</h3>
              <p className="project-description">
                A web-based ferry booking platform where operators list routes, schedules, and prices. 
                Users can easily browse, compare, and book ferry trips in just a few clicks. 
                The system streamlines booking, offers real-time availability, and ensures a smooth, 
                hassle-free travel experience.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">Firebase</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/LoydAMT/ferrybookingsystem-scamacs" target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fas fa-code"></i> View Code
                </a>
                <a href="https://swiftsail-ferries.vercel.app" target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
              </div>
            </div>

            {/* Project Card 3 - Furwell */}
            <div className="project-card">
              <div className="project-image">
                <img src="https://i.pinimg.com/736x/6d/70/56/6d7056f62e27b04fd1258a8298ff4edb.jpg" alt="Furwell" className="project-img-icon" />
              </div>
              <h3 className="project-title">Furwell</h3>
              <p className="project-description">
                A user-friendly platform connecting pet owners with nearby veterinary clinics. 
                Users can quickly find clinics and book appointments online,
                while clinics can subscribe to increase their visibility and attract more clients.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React</span>
                <span className="tech-tag">NodeJS</span>
                <span className="tech-tag">Firebase</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/laurenx122/marea-furwell" target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fas fa-code"></i> View Code
                </a>
                <a href="https://furwell.vercel.app/Home" target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;