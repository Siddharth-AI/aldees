"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 100);
      },
    });

    // Animated circles in background
    gsap.to(circlesRef.current?.children || [], {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
      stagger: { each: 2, repeat: -1 },
    });

    // Logo entrance - scale + rotation with elastic bounce
    tl.fromTo(
      logoRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.6)",
      }
    );

    // Glow pulse effect
    tl.to(
      glowRef.current,
      {
        scale: 1.3,
        opacity: 0.8,
        duration: 0.4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
      },
      "-=0.4"
    );

    // Text reveal with split animation
    tl.fromTo(
      textRef.current,
      { y: 60, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.5,
        ease: "power4.out",
      },
      "-=0.3"
    );

    // Progress bar container reveal
    tl.fromTo(
      progressBarRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      },
      "-=0.2"
    );

    // Progress fill with counter
    tl.to(
      progressFillRef.current,
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power1.inOut",
        onUpdate: function () {
          if (counterRef.current) {
            const progress = Math.round(this.progress() * 100);
            counterRef.current.textContent = `${progress}%`;
          }
        },
      },
      "-=0.1"
    );

    // Exit sequence - professional fade out
    tl.to(
      [progressBarRef.current, counterRef.current],
      {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      },
      "+=0.1"
    );

    tl.to(
      textRef.current,
      {
        y: -40,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power3.in",
      },
      "-=0.2"
    );

    tl.to(
      [logoRef.current, glowRef.current],
      {
        scale: 1.5,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      },
      "-=0.2"
    );

    // Split screen exit
    tl.to(
      overlayRef.current,
      {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.5,
        ease: "power4.inOut",
      },
      "-=0.2"
    );

    tl.to(
      preloaderRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      },
      "-=0.1"
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-100 bg-aldees-black">
      {/* Animated background circles */}
      <div
        ref={circlesRef}
        className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] border-2 border-aldees-yellow rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] border border-aldees-yellow rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-aldees-yellow/50 rounded-full" />
      </div>

      {/* Overlay for split exit */}
      <div ref={overlayRef} className="absolute inset-0 bg-aldees-black z-10" />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        {/* Logo with glow */}
        <div className="relative mb-12">
          <div
            ref={glowRef}
            className="absolute inset-0 bg-aldees-yellow/30 blur-[60px] scale-150 opacity-0"
          />
          <img
            ref={logoRef}
            src="/navbar_logo.png"
            alt="ALDEE'S"
            className="relative z-10 h-32 md:h-40 w-auto object-contain opacity-0"
          />
        </div>

        {/* Text */}
        <div
          ref={textRef}
          className="text-center mb-16 opacity-0"
          style={{ perspective: "1000px" }}>
          <h2 className="text-aldees-yellow/80 text-lg md:text-xl tracking-[0.4em] uppercase font-sans mb-2">
            Welcome to
          </h2>
          <h1 className="text-5xl md:text-6xl font-bold text-aldees-offwhite tracking-wider font-display">
            ALDEE'S
          </h1>
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div
            ref={progressBarRef}
            className="w-64 md:w-80 h-1 bg-aldees-offwhite/10 rounded-full overflow-hidden relative opacity-0">
            <div
              ref={progressFillRef}
              className="absolute inset-0 bg-gradient-to-r from-aldees-yellow via-aldees-yellow to-aldees-yellow/70 origin-left scale-x-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
          <span
            ref={counterRef}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-aldees-yellow text-sm font-bold tracking-wider font-sans opacity-0">
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
