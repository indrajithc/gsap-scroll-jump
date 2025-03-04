"use client"


import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./style.css";

gsap.registerPlugin(ScrollTrigger);

function Example() {
  const comp = useRef(null);
  const galleryRef = useRef(null);

  useLayoutEffect(() => {
    const sections = gsap.utils.toArray(".desktopContentSection");
    const photos = gsap.utils.toArray(".desktopPhoto");
    
    gsap.set(photos, { y: 200, opacity: 0 });
    gsap.set(sections, { opacity: 0, y: 100 });

    let mm = gsap.matchMedia(comp);
    
    mm.add("(min-width: 600px)", () => {
      console.log("desktop");

      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".right"
      });

      sections.forEach((section, index) => {
        let animation = gsap.timeline()
          .to(photos[index], { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
          .to(section, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.4");

        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          end: "top 30%",
          animation: animation,
          toggleActions: "play none none reverse",
          markers: false
        });
      });
      
      return () => console.log("mobile");
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={comp}>
      <div className="spacer"></div>
      <div ref={galleryRef} className="gallery">
        <div className="left">
          <div className="desktopContent">
            <div className="desktopContentSection"><h1>Red</h1><p>Red description...</p></div>
            <div className="desktopContentSection"><h1>Green</h1><p>Green description...</p></div>
            <div className="desktopContentSection"><h1>Pink</h1><p>Pink description...</p></div>
            <div className="desktopContentSection"><h1>Blue</h1><p>Blue description...</p></div>
          </div>
        </div>
        <div className="right">
          <div className="desktopPhotos">
            <div className="desktopPhoto red"></div>
            <div className="desktopPhoto green"></div>
            <div className="desktopPhoto pink"></div>
            <div className="desktopPhoto blue"></div>
          </div>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
}

export default Example;
