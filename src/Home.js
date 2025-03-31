import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const profile = {
    name: "Elaisha Mae M. Arias",
    title: "UI/UX Designer & Frontend Developer",
    bio: "Passionate about creating beautiful and functional web experiences.",
    skills: ["React", "JavaScript", "CSS", "HTML", "Node.js", "C", "C++", "C#"],
  };

  const [isVisible, setIsVisible] = useState({
    avatar: false,
    name: false,
    title: false,
    bio: false,
    skills: false,
  });

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible((prev) => ({ ...prev, avatar: true })), 200);
    const timer2 = setTimeout(() => setIsVisible((prev) => ({ ...prev, name: true })), 400);
    const timer3 = setTimeout(() => setIsVisible((prev) => ({ ...prev, title: true })), 600);
    const timer4 = setTimeout(() => setIsVisible((prev) => ({ ...prev, bio: true })), 800);
    const timer5 = setTimeout(() => setIsVisible((prev) => ({ ...prev, skills: true })), 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <div className={`home-avatar ${isVisible.avatar ? 'fade-in' : ''}`}>
            <img src="https://i.pinimg.com/736x/59/a1/d0/59a1d0af8d209662e7d5049074a356ff.jpg" alt="Profile" />
          </div>
          <h1 className={`fade-in ${isVisible.name ? 'visible' : ''}`}>{profile.name}</h1>
          <h2 className={`fade-in ${isVisible.title ? 'visible' : ''}`}>{profile.title}</h2>
        </div>

        <div className="home-bio">
          <p className={`bio fade-in ${isVisible.bio ? 'visible' : ''}`}>{profile.bio}</p>
        </div>

        <div className="home-skills">
          <h3 className={`fade-in ${isVisible.skills ? 'visible' : ''}`}>Skills</h3>
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