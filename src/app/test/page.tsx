"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  "Welcome to Our Website",
  "Discover Our Features",
  "Learn More About Us",
  "Get in Touch Today"
];

export default function Page() {
  const containerRef = useRef(null);
  const rightPanelRef = useRef(null);

  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Controls the duration of the pinned section
        scrub: 1,
        pin: true,
      }
    });

    sections.forEach((_, i) => {
      tl.to(rightPanelRef.current, {
        y: `-${i * 100}vh`,
        duration: 1,
        ease: "power2.out"
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="position-relative d-flex flex-column" style={{ height: "500vh" }}>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <h1 className="display-4 fw-bold">Header Section</h1>
      </div>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-secondary text-white">
        <h1 className="display-4 fw-bold">Banner Section</h1>
      </div>
      <div className="vh-100 d-flex align-items-center justify-content-center bg-white position-relative overflow-hidden">
        <div className="w-50 d-flex align-items-center justify-content-center fs-3 fw-bold position-fixed start-0 h-100">
          Static Left Panel
        </div>
        <div ref={rightPanelRef} className="w-50 position-absolute top-0 end-0 h-100 overflow-hidden">
          {sections.map((text, i) => (
            <div key={i} className="vh-100 d-flex align-items-center justify-content-center fs-2 fw-semibold">
              {text}
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <h1 className="display-4 fw-bold">Footer Section</h1>
      </div>
    </div>
  );
}
