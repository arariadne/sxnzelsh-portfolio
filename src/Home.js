import React from 'react';
import './Home.css';

function Home() {
  const profile = {
    name: "Elaisha Mae M. Arias",
    title: "UI/UD Designer & Frontend Developer",
    bio: "Passionate about creating beautiful and functional web experiences.",
    skills: ["React", "JavaScript", "CSS", "HTML", "Node.js", "C", "C++", "C#"],
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <div className="home-avatar">
            <img src="https://via.placeholder.com/150" alt="Profile" />
          </div>
          <h1 className="fade-in">{profile.name}</h1>
          <h2 className="fade-in">{profile.title}</h2>
        </div>

        <div className="home-bio">
          <p className="bio fade-in">{profile.bio}</p>
        </div>

        <div className="home-skills">
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
    </div>
  );
}

export default Home;