"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoImageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header text stagger animation
      const headerElements = textRef.current?.children;
      if (headerElements) {
        gsap.fromTo(
          headerElements,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Video container scale + clip reveal
      gsap.fromTo(
        videoContainerRef.current,
        {
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          scale: 0.8,
          rotateX: 15,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
          rotateX: 0,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Video image zoom effect
      gsap.fromTo(
        videoImageRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Play button entrance
      gsap.fromTo(
        playButtonRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          delay: 1,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Corner frames animate in
      const corners = cornersRef.current?.children;
      if (corners) {
        gsap.fromTo(
          corners,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: 1.2,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Floating decorative elements
      gsap.to(".video-float-1", {
        y: -50,
        rotation: 15,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".video-float-2", {
        y: 50,
        rotation: -15,
        scale: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Parallax on video container
      gsap.to(videoContainerRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Animated grid background
      gsap.to(gridRef.current, {
        backgroundPosition: "100% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 3,
        },
      });

      // Floating particles animation
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          const distance = 50 + i * 20;

          gsap.to(particle, {
            y: direction * distance,
            x: -direction * (distance / 2),
            rotation: direction * 180,
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2 + i * 0.5,
            },
          });

          // Continuous rotation
          gsap.to(particle, {
            rotation: `+=${direction * 360}`,
            duration: 20 + i * 5,
            repeat: -1,
            ease: "none",
          });
        });
      }

      // Morphing blob animation
      gsap.to(".morph-blob", {
        scale: 1.3,
        x: 100,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Continuous blob morph
      gsap.to(".morph-blob", {
        borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-3 bg-aldees-black overflow-hidden">
      {/* Animated Grid Background */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 229, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 229, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Morphing Blob */}
      <div className="morph-blob absolute top-20 right-10 w-[400px] h-[400px] bg-aldees-yellow/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-aldees-yellow/40 rounded-full" />
        <div className="absolute top-[40%] right-[15%] w-3 h-3 bg-aldees-yellow/30 rounded-full" />
        <div className="absolute top-[60%] left-[20%] w-2 h-2 bg-aldees-yellow/50 rounded-full" />
        <div className="absolute top-[80%] right-[25%] w-3 h-3 bg-aldees-yellow/20 rounded-full" />
        <div className="absolute top-[30%] left-[70%] w-2 h-2 bg-aldees-yellow/40 rounded-full" />
        <div className="absolute top-[70%] left-[80%] w-2 h-2 bg-aldees-yellow/35 rounded-full" />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-b from-aldees-black via-aldees-black/95 to-aldees-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aldees-yellow/5 rounded-full blur-[150px]" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Decorative Elements */}
      <div className="video-float-1 absolute top-20 left-10 w-32 h-32 border-2 border-aldees-yellow/20 rounded-full pointer-events-none" />
      <div className="video-float-2 absolute bottom-20 right-10 w-24 h-24 bg-aldees-yellow/5 pointer-events-none" />

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div ref={textRef} className="text-center mb-16">
          <span className="inline-block text-aldees-yellow text-sm tracking-[0.4em] uppercase mb-6 font-sans font-semibold">
            Behind The Scenes
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-aldees-offwhite leading-[0.9]">
            Where The
            <span className="block text-aldees-yellow">Magic Happens</span>
          </h2>
        </div>

        {/* Video Container */}
        <div
          ref={videoContainerRef}
          className="relative aspect-video max-w-5xl mx-auto overflow-hidden border border-aldees-yellow/20 shadow-[0_0_100px_rgba(255,229,0,0.1)]"
          style={{ perspective: "1000px" }}>
          {/* Video Placeholder */}
          <img
            ref={videoImageRef}
            src="/restaurant-kitchen-chef-cooking-flames-professiona.jpg"
            alt="Kitchen behind the scenes"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-aldees-black/60 via-aldees-black/20 to-transparent" />

          {/* Play Button */}
          <button
            ref={playButtonRef}
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32 bg-aldees-yellow rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-500 shadow-[0_0_50px_rgba(255,229,0,0.5)]">
              {isPlaying ? (
                <Pause className="w-10 h-10 md:w-12 md:h-12 text-aldees-black" />
              ) : (
                <Play className="w-10 h-10 md:w-12 md:h-12 text-aldees-black" />
              )}
              {/* Pulse Effect */}
              <span className="absolute inset-0 rounded-full bg-aldees-yellow animate-ping opacity-30" />
            </div>
          </button>

          {/* Frame Corners */}
          <div ref={cornersRef}>
            <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-aldees-yellow" />
            <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-aldees-yellow" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-aldees-yellow" />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-aldees-yellow" />
          </div>
        </div>

        {/* Animated Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-aldees-yellow/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-aldees-yellow/20 to-transparent" />
      </div>
    </section>
  );
}
