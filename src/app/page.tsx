'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contentBlocks = [
  { id: 1, text: 'Content 1', bgClass: 'bg-light' },
  { id: 2, text: 'Content 2', bgClass: 'bg-secondary text-white' },
  { id: 3, text: 'Content 3', bgClass: 'bg-info text-white' },
];

const Page = () => {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = gsap.utils.toArray('.right-panel-content');

    gsap.to(panels, {
      yPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: rightPanelRef.current,
        start: 'top top',
        end: () => `+=${rightPanelRef.current?.offsetHeight}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        snap: 1 / (panels.length - 1),
      },
    });

    panels.forEach((panel) => {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div>
      <section className="container py-5">
        <h1 className="text-center">Introductory Content</h1>
        <p className="text-center">Scroll down to see the effect.</p>
      </section>

      <section className="vh-100 bg-dark text-white d-flex align-items-center justify-content-center">
        <h2>Banner Section</h2>
      </section>

      <section className="container-fluid">
        <div className="row">
          <div
            className="col-md-6 bg-dark text-white d-flex align-items-center justify-content-center position-sticky"
            style={{ top: 0, height: '100vh' }}
            ref={leftPanelRef}
          >
            <h2>Fixed Left Panel</h2>
          </div>
          <div className="col-md-6 p-0" ref={rightPanelRef}>
            {contentBlocks.map((block) => (
              <div
                key={block.id}
                className={`right-panel-content d-flex align-items-center justify-content-center ${block.bgClass}`}
                style={{ height: '100vh' }}
              >
                <h3>{block.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center">Normal Scrolling Resumes</h2>
      </section>
    </div>
  );
};

export default Page;
