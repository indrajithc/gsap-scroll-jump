'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap'; 

const sections = [
  'First dynamic text',
  'Second dynamic text',
  'Third dynamic text',
  'Fourth dynamic text'
];

export default function HomePage() {
  const stickyRef = useRef(null);
  const textRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const scrollPosition = window.scrollY;
      const sectionOffsetTop = stickyRef.current.parentElement.offsetTop;
      const sectionHeight = stickyRef.current.parentElement.clientHeight;
      const progress = (scrollPosition - sectionOffsetTop) / sectionHeight;
      const newIndex = Math.min(Math.max(Math.floor(progress * sections.length), 0), sections.length - 1);

      if (newIndex !== currentIndex) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'bounce.out' }
        );
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);

  return (
    <div>
      <header className="bg-primary text-white text-center p-4">
        <h1>Next.js SPA with GSAP & Bootstrap</h1>
      </header>

      <section className="banner text-center bg-dark text-white py-5">
        <h2>Welcome to our page</h2>
      </section>

      {[...Array(3)].map((_, i) => (
        <section key={i} className="section d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <h2>Dummy Section {i + 1}</h2>
        </section>
      ))}

      <section className="sticky-container" style={{ position: 'relative', height: '300vh', background: '#f8f9fa' }}>
        <div className='row' style={{ position: 'sticky', top: '20%', height: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className='col-6 d-flex align-items-center justify-content-center' style={{ height: '100%', padding: '20px' }}>
            <img src="https://via.placeholder.com/300" alt="Placeholder" style={{ width: '100%', borderRadius: '10px' }} />
          </div>
          <div className='col-6'>
            <div
              ref={stickyRef}
              className="sticky-content text-center p-5"
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <h2 ref={textRef}>{sections[currentIndex]}</h2>
            </div>
          </div>
        </div>
      </section>

      {[...Array(6)].map((_, i) => (
        <section key={i + 3} className="section d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <h2>Dummy Section {i + 4}</h2>
        </section>
      ))}
    </div>
  );
}
