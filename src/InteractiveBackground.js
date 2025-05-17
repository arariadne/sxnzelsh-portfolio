
import React, { useEffect, useState } from 'react';

const InteractiveBackground = ({ }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      setMousePosition({ x: curX, y: curY });
      requestAnimationFrame(move);
    }

    const handleMouseMove = (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    move();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="gradient-bg">
      <svg>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        </filter>
      </svg>
      
    
      
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div 
          className="interactive" 
          style={{ 
            transform: `translate(${Math.round(mousePosition.x)}px, ${Math.round(mousePosition.y)}px)` 
          }}
        ></div>
      </div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dongle&display=swap');

        :root {
          --color-bg1: rgb(108, 0, 162);
          --color-bg2: rgb(0, 17, 82);
          --color1: 18, 113, 255;
          --color2: 221, 74, 255;
          --color3: 100, 220, 255;
          --color4: 200, 50, 50;
          --color5: 180, 180, 50;
          --color-interactive: 140, 100, 255;
          --circle-size: 80%;
          --blending: hard-light;
        }

        .gradient-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          overflow: hidden;
          background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
        }

        .gradient-bg svg {
          position: fixed;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
        }

        .text-container {
          z-index: 100;
          width: 100vw;
          height: 100vh;
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          justify-content: center;
          align-items: center;
          font-size: 96px;
          color: white;
          opacity: 0.8;
          user-select: none;
          text-shadow: 1px 1px rgba(0,0,0,0.1);
          font-family: 'Dongle', sans-serif;
        }

        .gradients-container {
          filter: url(#goo) blur(40px);
          width: 100%;
          height: 100%;
        }

        .g1, .g2, .g3, .g4, .g5, .interactive {
          position: absolute;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2);
          left: calc(50% - var(--circle-size) / 2);
        }

        .g1 {
          background: radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%) no-repeat;
          animation: moveVertical 30s ease infinite;
          opacity: 1;
        }

        .g2 {
          background: radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%) no-repeat;
          transform-origin: calc(50% - 400px);
          animation: moveInCircle 20s reverse infinite;
          opacity: 1;
        }

        .g3 {
          background: radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%) no-repeat;
          top: calc(50% - var(--circle-size) / 2 + 200px);
          left: calc(50% - var(--circle-size) / 2 - 500px);
          transform-origin: calc(50% + 400px);
          animation: moveInCircle 40s linear infinite;
          opacity: 1;
        }

        .g4 {
          background: radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%) no-repeat;
          transform-origin: calc(50% - 200px);
          animation: moveHorizontal 40s ease infinite;
          opacity: 0.7;
        }

        .g5 {
          background: radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%) no-repeat;
          width: calc(var(--circle-size) * 2);
          height: calc(var(--circle-size) * 2);
          top: calc(50% - var(--circle-size));
          left: calc(50% - var(--circle-size));
          transform-origin: calc(50% - 800px) calc(50% + 200px);
          animation: moveInCircle 20s ease infinite;
          opacity: 1;
        }

        .interactive {
          position: absolute;
          width: 1000px;
          height: 1000px;
          background: radial-gradient(circle at center, rgba(var(--color-interactive), 0.8) 0, rgba(var(--color-interactive), 0) 50%) no-repeat;
          border-radius: 50%;
          mix-blend-mode: screen;
          filter: blur(80px);
          pointer-events: none;
          z-index: 3;
          left: 0;
          top: 0;
          margin-left: -500px;
          margin-top: -500px;
          animation: morph 15s ease-in-out infinite;
          transition: transform 0.05s ease-out;
        }

        @keyframes moveInCircle {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes moveVertical {
          0% { transform: translateY(-50%); }
          50% { transform: translateY(50%); }
          100% { transform: translateY(-50%); }
        }

        @keyframes moveHorizontal {
          0% { transform: translateX(-50%) translateY(-10%); }
          50% { transform: translateX(50%) translateY(10%); }
          100% { transform: translateX(-50%) translateY(-10%); }
        }
        
        @keyframes morph {
          0% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveBackground;