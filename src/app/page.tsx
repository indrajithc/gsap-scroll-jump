'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const sections = [
  'First dynamic section',
  'Second dynamic section',
  'Third dynamic section',
  'Fourth dynamic section'
];

export default function HomePage() {
  const stickyRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.5 }
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.section').forEach((section) => {
      observer.observe(section);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const scrollPosition = window.scrollY;
      const sectionHeight = window.innerHeight;
      const newIndex = Math.floor(scrollPosition / sectionHeight) % sections.length;
      if (newIndex !== currentIndex) {
        gsap.fromTo(
          stickyRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5 }
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

      <section className="sticky-container" style={{ position: 'relative', height: '200vh', background: '#f8f9fa' }}>
        <div
          ref={stickyRef}
          className="sticky-content text-center p-5"
          style={{
            position: 'sticky',
            top: '30%',
            transform: 'translateY(-50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}
        >
          <h2>{sections[currentIndex]}</h2>
        </div>
      </section>

      {[...Array(2)].map((_, i) => (
        <section key={i + 3} className="section d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <h2>Dummy Section {i + 4}</h2>
        </section>
      ))}
    </div>
  );
}
