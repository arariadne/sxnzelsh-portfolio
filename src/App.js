import React from 'react';
import './App.css';

function App() {
  const profile = {
    name: "John Doe",
    title: "Frontend Developer",
    bio: "Passionate about creating beautiful and functional web experiences",
    skills: ["React", "JavaScript", "CSS", "HTML"],
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  };

  return (
    <div className="App">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Profile"
            />
          </div>
          <h1>{profile.name}</h1>
          <h2>{profile.title}</h2>
        </div>
        
        <div className="profile-content">
          <p className="bio">{profile.bio}</p>
          
          <div className="skills-section">
            <h3>Skills</h3>
            <div className="skills-list">
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="contact-section">
            <h3>Contact</h3>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
