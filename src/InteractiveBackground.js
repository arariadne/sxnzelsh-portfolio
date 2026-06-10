
import React, { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
  const interactiveRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    let rafId;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      rafId = requestAnimationFrame(move);
    }

    const handleMouseMove = (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(move);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="gradient-bg">
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="interactive" ref={interactiveRef}></div>
      </div>

      <style jsx>{`
        :root {
          --color-bg1: rgb(108, 0, 162);
          --color-bg2: rgb(0, 17, 82);
          --color1: 18, 113, 255;
          --color2: 221, 74, 255;
          --color3: 100, 220, 255;
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

        .gradients-container {
          width: 100%;
          height: 100%;
          filter: blur(50px);
          will-change: filter;
          transform: translateZ(0);
        }

        .g1, .g2, .g3, .interactive {
          position: absolute;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2);
          left: calc(50% - var(--circle-size) / 2);
          will-change: transform;
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

        .interactive {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle at center, rgba(var(--color-interactive), 0.8) 0, rgba(var(--color-interactive), 0) 50%) no-repeat;
          border-radius: 50%;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 3;
          left: 0;
          top: 0;
          margin-left: -300px;
          margin-top: -300px;
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

        @media (prefers-reduced-motion: reduce) {
          .g1, .g2, .g3 {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveBackground;