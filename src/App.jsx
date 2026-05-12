import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default'); 
  const [scrollY, setScrollY] = useState(0);
  const sectionsRef = useRef([]);
  const magnetBtnRef = useRef(null);
  const magnetTextRef = useRef(null);

  useEffect(() => {
    // Intro Loader
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const handleMagnetMove = (e) => {
    const btn = magnetBtnRef.current;
    const text = magnetTextRef.current;
    if (!btn || !text) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    text.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMagnetLeave = () => {
    const btn = magnetBtnRef.current;
    const text = magnetTextRef.current;
    if (!btn || !text) return;
    btn.style.transform = `translate(0px, 0px)`;
    text.style.transform = `translate(0px, 0px)`;
    setCursorType('default');
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="cinematic-line"></div>
        
        {/* SVG Filter for Logo Transparency */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="remove-white">
            <feColorMatrix type="matrix" values="
              0 0 0 0 1
              0 0 0 0 1
              0 0 0 0 1
              -1 -1 -1 0 1
            " />
          </filter>
        </svg>

        {/* Intro Loader */}
        <div className={`intro-loader ${!loading ? 'hide' : ''}`}>
          <div className="loader-logo">
            <img src="https://lirp.cdn-website.com/63b9c161/dms3rep/multi/opt/Unknown-1-1920w.png" alt="Logo" className="logo-img-loader" />
          </div>
          <div className="loader-bar">
            <div className="loader-progress"></div>
          </div>
        </div>

        {/* Advanced Custom Cursor */}
        <div 
          className={`custom-cursor ${cursorType !== 'default' ? 'active' : ''} type-${cursorType}`}
          style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
        >
          {cursorType === 'view' && <span className="cursor-text">VIEW</span>}
          {cursorType === 'drag' && <span className="cursor-text">DRAG</span>}
        </div>

        <Routes>
          <Route path="/" element={
            <HomePage 
              setCursorType={setCursorType} 
              scrollY={scrollY} 
              sectionsRef={sectionsRef}
              handleMagnetMove={handleMagnetMove}
              handleMagnetLeave={handleMagnetLeave}
              magnetBtnRef={magnetBtnRef}
              magnetTextRef={magnetTextRef}
            />
          } />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
