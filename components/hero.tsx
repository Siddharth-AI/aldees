"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for title
      const title = titleRef.current;
      if (title) {
        const text = title.innerText;
        title.innerHTML = text
          .split("")
          .map((char) =>
            char === " " ? " " : `<span class="split-char">${char}</span>`
          )
          .join("");

        gsap.fromTo(
          title.querySelectorAll(".split-char"),
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.03,
            ease: "power4.out",
            delay: 2.5, // Increased delay to account for preloader
          }
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 3.2 }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 3.5 }
      );

      // Video parallax
      gsap.to(videoRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Overlay fade
      gsap.to(overlayRef.current, {
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(contentRef.current, {
        scale: 0.9,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    const handleMouseMove = (e: MouseEvent) => {
      if (!contentRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;

      gsap.to(contentRef.current, {
        rotateY: x,
        rotateX: -y,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToContent = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div ref={videoRef} className="absolute inset-0 -top-20 -bottom-20">
        <img
          src="/dark-moody-restaurant-interior-with-warm-golden-li.jpg"
          alt="ALDEE'S Restaurant Ambience"
          className="w-full h-full object-cover scale-110"
        />
      </div>

      {/* Gradient Overlays */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-linear-to-b from-aldees-black/70 via-aldees-black/50 to-aldees-black opacity-70"
      />
      <div className="absolute inset-0 bg-linear-to-r from-aldees-black/80 via-transparent to-aldees-black/80" />

      {/* Noise Texture */}
      <div className="absolute inset-0 noise-overlay" />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,229,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,229,0,0.5) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Content with 3D perspective */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-6 text-center"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
        {/* Tagline */}
        <div className="mb-8 overflow-hidden">
          <p className="text-aldees-yellow/80 text-sm md:text-base tracking-[0.4em] uppercase font-medium relative">
            Est. 2010 — Restaurant & Cafe
            <span className="absolute -top-1 -right-2 w-2 h-2 bg-aldees-red rounded-full animate-pulse"></span>
          </p>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-aldees-offwhite mb-8 tracking-tight leading-none glow-yellow">
          FRESH PICKS
          <span className="block text-aldees-yellow">FLAVOR HITS</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-aldees-offwhite/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          Bold flavors crafted with passion. Every dish tells a story of
          quality, tradition, and the relentless pursuit of culinary excellence.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative px-12 py-5 bg-aldees-yellow text-aldees-black font-bold text-lg tracking-wider uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,229,0,0.4)]">
            <span className="relative z-10">Explore Menu</span>
            <div className="absolute inset-0 bg-aldees-offwhite transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <span className="absolute inset-0 flex items-center justify-center text-aldees-black font-bold text-lg tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              Explore Menu
            </span>
          </button>

          <button className="group flex items-center gap-4 px-8 py-5 border border-aldees-offwhite/30 text-aldees-offwhite font-medium text-lg tracking-wider uppercase hover:border-aldees-yellow hover:text-aldees-yellow transition-all duration-300">
            <span className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:bg-aldees-yellow group-hover:text-aldees-black transition-all duration-300">
              <Play className="w-5 h-5 ml-1" />
            </span>
            Watch Story
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-aldees-offwhite/50 hover:text-aldees-yellow transition-colors duration-300 cursor-pointer">
        <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </button>

      {/* Side Text */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 z-10">
        <p
          className="text-aldees-offwhite/30 text-sm tracking-[0.3em] uppercase"
          style={{ writingMode: "vertical-rl" }}>
          Premium Quality Since 2010
        </p>
      </div>

      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-aldees-yellow/50 to-transparent" />
          <div className="w-3 h-3 border border-aldees-yellow/50 rotate-45" />
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-aldees-yellow/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
