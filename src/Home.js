import React from 'react';
import './Home.css';

function Home() {
  return (
    <>
      {/* Navbar 
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#about" className="navbar-link active">About Me</a>
          <a href="#projects" className="navbar-link">My Projects</a>
          <a href="#contact" className="navbar-link">Contact Me</a>
        </div>
      </nav>*/}
      
      {/* Main Home Section */}
      <section id="home" className="home-container">
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
    </>
  );
}

export default Home;