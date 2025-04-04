import React from 'react';
import './Home.css';
// import profileImage from './path/to/your/image.jpg'; // Import your image here

function Home() {
  const profile = {
    name: "Elaisha Mae M. Arias",
    title: "UI/UX Designer & Frontend Developer", 
    bio: "Passionate about creating beautiful, functional, and accessible web experiences.",
    avatarUrl: "https://via.placeholder.com/150", // Placeholder
    skills: ["React", "JavaScript", "CSS", "HTML", "Node.js", "C", "C++", "C#", "UI Design", "UX Principles", "Figma"], // Added a few more relevant skills
  };

  return (
    <main className="home-container">
      <div className="home-content">
        <div className="home-header">
          <div className="home-avatar">
            {/* Use imported image or actual URL */}
            <img src={profile.avatarUrl} alt={`${profile.name} - ${profile.title}`} />
          </div>
          {/* Added animation delay for staggered effect */}
          <h1 className="fade-in" style={{ animationDelay: '0.1s' }}>{profile.name}</h1>
          <h2 className="fade-in" style={{ animationDelay: '0.2s' }}>{profile.title}</h2>
        </div>

        <div className="home-bio">
           {/* Added animation delay for staggered effect */}
          <p className="bio fade-in" style={{ animationDelay: '0.3s' }}>{profile.bio}</p>
        </div>

        <div className="home-skills fade-in" style={{ animationDelay: '0.4s' }}>
          <h3>Skills</h3>
          <div className="skills-list">
            {profile.skills.map((skill) => (
              <span key={skill} className="skill-tag">
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