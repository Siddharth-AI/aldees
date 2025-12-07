"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax - moves slower than scroll
      gsap.to(bgRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Glass card comes down from top
      gsap.fromTo(
        glassRef.current,
        { y: -200, opacity: 0, scale: 0.8, rotateX: 45 },
        {
          y: 0,
          opacity: 0.8,
          scale: 1,
          rotateX: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        textRef.current?.children || [],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll(".stat-number");
      statNumbers?.forEach((stat) => {
        const target = Number.parseInt(stat.getAttribute("data-target") || "0");
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <div ref={bgRef} className="absolute inset-0 -top-32 -bottom-32">
        <img
          src="/restaurant-outdoor-seating-patio-evening-lights-ro.jpg"
          alt="Restaurant Ambience"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-aldees-black via-aldees-black/70 to-aldees-black" />
      </div>

      {/* Floating Glass Card */}
      <div
        ref={glassRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-5xl"
        style={{ perspective: "1000px" }}>
        <div className="relative bg-aldees-black/40 backdrop-blur-2xl border border-aldees-yellow/20 p-12 md:p-20 shadow-[0_0_100px_rgba(255,229,0,0.1)]">
          {/* Glass Shine Effect */}
          <div className="absolute inset-0 bg-linear-to-br from-aldees-yellow/10 via-transparent to-transparent opacity-50" />

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-aldees-yellow" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-aldees-yellow" />

          <div ref={textRef} className="relative z-10 text-center">
            <span className="inline-block text-aldees-yellow text-sm tracking-[0.4em] uppercase mb-6">
              Why Choose Us
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-aldees-offwhite mb-8 leading-[0.9]">
              Crafting
              <span className="block text-aldees-yellow">Unforgettable</span>
              Moments
            </h2>
            <p className="text-lg md:text-xl text-aldees-offwhite/70 max-w-2xl mx-auto">
              Every visit to ALDEE'S is more than a meal—it's an experience
              crafted with passion, precision, and an unwavering commitment to
              excellence.
            </p>
          </div>

          {/* Stats Grid */}
          <div
            ref={statsRef}
            className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-aldees-yellow/20">
            {[
              { number: 15, suffix: "+", label: "Years of Excellence" },
              { number: 50, suffix: "K+", label: "Happy Customers" },
              { number: 100, suffix: "+", label: "Signature Dishes" },
              { number: 4.9, suffix: "", label: "Customer Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className="stat-number text-4xl md:text-5xl font-display font-bold text-aldees-yellow"
                    data-target={stat.number}>
                    0
                  </span>
                  <span className="text-2xl text-aldees-yellow">
                    {stat.suffix}
                  </span>
                </div>
                <span className="text-sm text-aldees-offwhite/60 tracking-wider uppercase mt-2 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
    </section>
  );
}
