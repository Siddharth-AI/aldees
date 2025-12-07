"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video container reveal with clip-path
      gsap.fromTo(
        videoContainerRef.current,
        { clipPath: "inset(50% 50% 50% 50%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      // Text parallax
      gsap.to(textRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Floating elements
      gsap.to(".video-float-1", {
        y: -40,
        rotation: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".video-float-2", {
        y: 40,
        rotation: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 bg-aldees-offwhite overflow-hidden">
      {/* Decorative Elements */}
      <div className="video-float-1 absolute top-20 left-10 w-32 h-32 border-2 border-aldees-yellow/30 rounded-full pointer-events-none" />
      <div className="video-float-2 absolute bottom-20 right-10 w-24 h-24 bg-aldees-yellow/10 pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={textRef} className="text-center mb-16">
          <span className="inline-block text-aldees-black/60 text-sm tracking-[0.4em] uppercase mb-6">
            Behind The Scenes
          </span>
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-aldees-black leading-[0.9]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Where The
            <span className="block text-aldees-yellow drop-shadow-[0_2px_0_#000]">
              Magic Happens
            </span>
          </h2>
        </div>

        {/* Video Container */}
        <div
          ref={videoContainerRef}
          className="relative aspect-video max-w-5xl mx-auto overflow-hidden">
          {/* Video Placeholder (replace with actual video) */}
          <img
            src="/restaurant-kitchen-chef-cooking-flames-professiona.jpg"
            alt="Kitchen behind the scenes"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-aldees-black/40" />

          {/* Play Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-aldees-yellow rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-500">
            {isPlaying ? (
              <Pause className="w-10 h-10 md:w-12 md:h-12 text-aldees-black" />
            ) : (
              <Play className="w-10 h-10 md:w-12 md:h-12 text-aldees-black ml-2" />
            )}
            {/* Pulse Effect */}
            <span className="absolute inset-0 rounded-full bg-aldees-yellow animate-ping opacity-30" />
          </button>

          {/* Frame Corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-aldees-yellow" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-aldees-yellow" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-aldees-yellow" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-aldees-yellow" />
        </div>

        {/* Stats Below Video */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          {[
            { number: "15+", label: "Expert Chefs" },
            { number: "50+", label: "Menu Items" },
            { number: "100%", label: "Fresh Daily" },
            { number: "5★", label: "Rated" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span
                className="block text-4xl md:text-5xl font-bold text-aldees-black"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {stat.number}
              </span>
              <span className="text-aldees-black/60 text-sm tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
