import React from 'react';
import './Home.css';

function Home() {
  const profile = {
    name: "Elaisha Mae M. Arias",
    title: "UI/UX Designer & Frontend Developer",
    bio: "Passionate about creating beautiful, functional, and accessible web experiences.",
    avatarUrl: "https://i.pinimg.com/1200x/59/94/62/599462ca1ee3fa36a349c39482e223db.jpg", // Using the provided URL
    skills: ["React", "JavaScript", "CSS", "HTML", "Node.js", "C", "C++", "C#", "UI Design", "UX Principles", "Figma"],
  };

  return (
    <main className="home-container">
      <div className="home-content">
        <div className="home-header">
          <div className="home-avatar">
            <img src={profile.avatarUrl} alt={`${profile.name} - ${profile.title}`} />
          </div>
          <h1 className="home-h1">{profile.name}</h1>
          <h2 className="home-h2">{profile.title}</h2>
        </div>

        <div className="home-bio">
          <p className="home-bio-text">{profile.bio}</p>
        </div>

        <div className="home-skills">
          <h3 className="home-h3">Skills</h3>
          <div className="home-skills-list">
            {profile.skills.map((skill, index) => (
              <span key={skill} className="home-skill-tag" style={{animationDelay: `${0.1 * index}s`}}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;