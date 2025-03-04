"use client"
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Example() {
  const comp = useRef(null);
  const galleryRef = useRef(null);

  useLayoutEffect(() => {
    const details = gsap.utils.toArray(".content-section:not(:first-child)");
    const cards = gsap.utils.toArray(".desktop-photo:not(:first-child)");
    gsap.set(cards, { yPercent: 100, opacity: 0 });

    let mm = gsap.matchMedia(comp);

    mm.add("(min-width: 600px)", () => {
      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".right"
      });

      details.forEach((detail, index) => {
        let headline = detail.querySelector("h1");

        let animation = gsap
          .timeline()
          .to(cards[index], { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
          .set(cards[index - 1], { opacity: 0 });

        ScrollTrigger.create({
          trigger: headline,
          start: "top 80%",
          end: "top 50%",
          animation: animation,
          scrub: true,
          markers: false
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={comp} className="container-fluid bg-light">
      <div className="spacer w-100 vh-50 bg-secondary"></div>
      <div ref={galleryRef} className="row g-0 gallery">
        <div className="col-md-6 d-none d-md-block left">
          <div className="desktop-content px-5">
            <div className="content-section py-5">
              <h1 className="display-4">Red</h1>
              <p className="fs-3">Red is a color often associated with strong emotions...</p>
            </div>
            <div className="content-section py-5">
              <h1 className="display-4">Green</h1>
              <p className="fs-3">Green is a color often associated with nature, growth, and harmony...</p>
            </div>
            <div className="content-section py-5">
              <h1 className="display-4">Pink</h1>
              <p className="fs-3">Pink is a color associated with femininity, romance, and sweetness...</p>
            </div>
            <div className="content-section py-5">
              <h1 className="display-4">Blue</h1>
              <p className="fs-3">Blue is a color associated with calmness, trust, and reliability...</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 right d-flex flex-column justify-content-center align-items-center">
          <div className="desktop-photos position-relative w-50 h-50 rounded-3 shadow-lg overflow-hidden">
            <div className="desktop-photo position-absolute w-100 h-100 bg-danger text-white d-flex align-items-center justify-content-center fs-2 rounded-3">Red</div>
            <div className="desktop-photo position-absolute w-100 h-100 bg-success text-white d-flex align-items-center justify-content-center fs-2 rounded-3">Green</div>
            <div className="desktop-photo position-absolute w-100 h-100 bg-pink text-white d-flex align-items-center justify-content-center fs-2 rounded-3">Pink</div>
            <div className="desktop-photo position-absolute w-100 h-100 bg-primary text-white d-flex align-items-center justify-content-center fs-2 rounded-3">Blue</div>
          </div>
        </div>
      </div>
      <div className="spacer w-100 vh-50 bg-secondary"></div>
    </div>
  );
}

export default Example;
