"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating circles animation
      gsap.utils
        .toArray<HTMLElement>(".floating-circle")
        .forEach((circle, i) => {
          gsap.to(circle, {
            y: "random(-50, 50)",
            x: "random(-30, 30)",
            rotation: "random(-15, 15)",
            duration: "random(3, 5)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.2,
          });
        });

      // Parallax on scroll
      gsap.utils.toArray<HTMLElement>(".parallax-float").forEach((el) => {
        const speed = el.dataset.speed || "0.5";
        gsap.to(el, {
          yPercent: -100 * Number.parseFloat(speed),
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large ambient circles */}
      <div
        className="floating-circle parallax-float absolute -top-40 -right-40 w-[600px] h-[600px] border border-aldees-yellow/5 rounded-full"
        data-speed="0.3"
      />
      <div
        className="floating-circle parallax-float absolute top-1/3 -left-20 w-[400px] h-[400px] border border-aldees-yellow/5 rounded-full"
        data-speed="0.5"
      />
      <div
        className="floating-circle parallax-float absolute bottom-1/4 right-1/4 w-[300px] h-[300px] border border-aldees-yellow/3 rounded-full"
        data-speed="0.4"
      />

      {/* Small glowing dots */}
      <div className="floating-circle absolute top-1/4 left-1/4 w-2 h-2 bg-aldees-yellow/30 rounded-full blur-sm" />
      <div className="floating-circle absolute top-1/2 right-1/3 w-3 h-3 bg-aldees-yellow/20 rounded-full blur-sm" />
      <div className="floating-circle absolute bottom-1/3 left-1/3 w-2 h-2 bg-aldees-yellow/25 rounded-full blur-sm" />
      <div className="floating-circle absolute top-2/3 right-1/4 w-4 h-4 bg-aldees-yellow/15 rounded-full blur-md" />

      {/* Gradient orbs */}
      <div
        className="parallax-float absolute top-1/4 right-1/4 w-96 h-96 bg-aldees-yellow/5 rounded-full blur-3xl"
        data-speed="0.2"
      />
      <div
        className="parallax-float absolute bottom-1/4 left-1/4 w-64 h-64 bg-aldees-yellow/3 rounded-full blur-3xl"
        data-speed="0.6"
      />
    </div>
  );
}
