import React from 'react';
import './Home.css';
import Footer from './Footer'; // Import the Footer component

function Home() {
  const profile = {
    name: "Elaisha Mae M. Arias",
    title: "UI/UD Designer &Frontend Developer",
    bio: "Passionate about creating beautiful and functional web experiences",
    skills: ["React", "JavaScript", "CSS", "HTML", "Node.js", "C", "C++","C#"],
    
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
        </div>
        <h1 className="fade-in">{profile.name}</h1>
        <h2 className="fade-in">{profile.title}</h2>
      </div>

      <div className="profile-content">
        <p className="bio fade-in">{profile.bio}</p>

        <div className="skills-section fade-in">
          <h3>Skills</h3>
          <div className="skills-list">
            {profile.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;