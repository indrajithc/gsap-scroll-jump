'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const rightPanelRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const rightPanel = rightPanelRef.current;
    const container = containerRef.current;
    const items = rightPanel.querySelectorAll('.scroll-item');

    gsap.to(items, {
      yPercent: -100 * (items.length - 3), // Moves through each item
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${items.length * 100}%`,
        pin: '.left-panel', // Pins the left panel
        scrub: true,
      },
    });
  }, []);

  return (
    <div>
      {/* Full-Height Banner */}
      <section className="vh-100 bg-primary text-white d-flex align-items-center justify-content-center">
        <h1>Full-Height Banner</h1>
      </section>

      <section className="vh-100 bg-secondary text-white d-flex align-items-center justify-content-center">
        <h1>Full-Height Banner Two</h1>
      </section>

      <section className="vh-100 bg-warning text-white d-flex align-items-center justify-content-center">
        <h1>Full-Height Banner Three</h1>
      </section>

      {/* Scrolling Section */}
      <section ref={containerRef} className="container-fluid overflow-hidden">
        <div className="row">
          {/* Left Panel (Static) */}
          <div className="col-md-6 left-panel bg-dark text-white d-flex align-items-center justify-content-center p-5">
            <h2>Static Left Panel</h2>
          </div>

          {/* Right Panel (Scrolling Content) */}
          <div ref={rightPanelRef} className="col-md-6 right-panel position-relative">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="scroll-item bg-light border p-5 vh-100 d-flex align-items-center justify-content-center">
                <h3>Content Block {i + 1}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Normal Scrolling Section */}
      <section className="vh-100 bg-white text-danger d-flex align-items-center justify-content-center">
        <h2>Next Section</h2>
      </section>

      <section className="vh-100 bg-secondary text-info d-flex align-items-center justify-content-center">
        <h2>Next Section</h2>
      </section>

      <section className="container py-5">
        <h2>Next Section</h2>
        <p>This section scrolls normally after the right panel finishes.</p>
      </section>
    </div>
  );
}
