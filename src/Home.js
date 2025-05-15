import React from 'react';
import './Home.css';

function Home() {
  const profile = {
    name: "Elaisha Mae Arias",
    title: "an aspiring UI/UX Designer and Fullstack Developer",
    bio: "As a highly motivated and detail-oriented aspiring UI/UX Designer and Front-end Developer, I am dedicated to ensuring the quality, functionality, and aesthetic appeal of software applications. I am seeking a position where I can leverage my expertise, analytical skills, and passion for delivering exceptional user experiences to contribute to innovative software solutions.",
    avatarUrl: "https://via.placeholder.com/150", // Dummy image as requested
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/arariadne", icon: "fab fa-github" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/elaisha-arias", icon: "fab fa-linkedin" },
      { platform: "Facebook", url: "https://facebook.com/elaisha.arias", icon: "fab fa-facebook" },
    ],
  };

  return (
    <main className="home-container">
      <div className="home-content">
        <div className="home-header">
          <div className="home-avatar">
            <img src={profile.avatarUrl} alt={`${profile.name} - ${profile.title}`} />
          </div>
          <div className="home-greeting">Hi! I'm</div>
          <h1 className="home-h1">{profile.name}</h1>
          <h2 className="home-h2">{profile.title}</h2>
        </div>

        <div className="home-bio">
          <p className="home-bio-text">{profile.bio}</p>
        </div>

        <div className="home-socials">
          {profile.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className={link.icon}></i>
              <span>{link.url}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;