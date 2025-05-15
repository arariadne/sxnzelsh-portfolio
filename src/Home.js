import React from 'react';
import './Home.css';

function Home() {
  return (
    <main className="home-container">
      <div className="home-content">
        {/* Profile Image - 30% width */}
        <div className="profile-section">
          <div className="profile-image-container">
            <img 
              src="https://i.pinimg.com/736x/f9/e0/0f/f9e00f9615e0d86a5a7f02caebd00486.jpg" 
              alt="Elaisha Mae Arias" 
              className="profile-image" 
            />
        
          </div>
        </div>

        {/* Content Section - 70% width */}
        <div className="content-section">
          <p className="greeting">Hi! I'm</p>
          <h1 className="name">ELAISHA MAE ARIAS</h1>
          <h2 className="title">an aspiring UI/UX Designer and Fullstack Developer</h2>
          
          <p className="bio">
            As a highly motivated and detail-oriented aspiring UI/UX Designer and Front-end 
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

      {/* Tech Stacks Section */}
      <div className="techstacks-container">
        <div className="main-techstacks">
          <h2 className="techstack-heading">MY MAIN TECHSTACKS</h2>
          <div className="techstack-grid">
            <div className="techstack-item">
              <div className="tech-icon react">
                <i className="fab fa-react"></i>
              </div>
              <span>REACTJS</span>
            </div>
            <div className="techstack-item">
              <div className="tech-icon vitejs">
                <img src="https://icon.icepanel.io/Technology/svg/Vite.js.svg" alt="ViteJS" />
              </div>
              <span>VITEJS</span>
            </div>
            <div className="techstack-item">
              <div className="tech-icon nodejs">
                <i className="fab fa-node-js"></i>
              </div>
              <span>NODEJS</span>
            </div>
            <div className="techstack-item">
              <div className="tech-icon firebase">
                <i className="fas fa-fire"></i>
              </div>
              <span>FIREBASE</span>
            </div>
            <div className="techstack-item">
              <div className="tech-icon sass">
                <i className="fab fa-sass"></i>
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

        <div className="other-techstacks">
          <h2 className="techstack-heading">OTHER TECHSTACKS</h2>
          <div className="techstack-grid">
            <div className="techstack-item">
              <div className="tech-icon arduino">
                <img src="https://icon.icepanel.io/Technology/svg/Arduino.svg" alt="Arduino" />
              </div>
            </div>
            <div className="techstack-item">
              <div className="tech-icon c">
                <img src="https://icon.icepanel.io/Technology/svg/C.svg" alt="C" />
              </div>
            </div>
            <div className="techstack-item">
              <div className="tech-icon csharp">
                <img src="https://icon.icepanel.io/Technology/svg/C%23-%28CSharp%29.svg" alt="C#" />
              </div>
            </div>
            <div className="techstack-item">
              <div className="tech-icon cpp">
                <img src="https://icon.icepanel.io/Technology/svg/C%2B%2B-%28CPlusPlus%29.svg" alt="C++" />
              </div>
            </div>
            <div className="techstack-item">
              <div className="tech-icon nextjs">
                <img src="https://icon.icepanel.io/Technology/png-shadow-512/Next.js.png" alt="NextJS" />
              </div>
            </div>
            <div className="techstack-item">
              <div className="tech-icon java">
                <img src="https://icon.icepanel.io/Technology/svg/Java.svg" alt="Java" />
              </div>
            </div>
            <div className="techstack-item">
              <div className="tech-icon graphql">
                <img src="https://icon.icepanel.io/Technology/svg/GraphQL.svg" alt="GraphQL" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;