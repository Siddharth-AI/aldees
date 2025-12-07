"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Utensils, Coffee, Cake, Wine } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Utensils,
    title: "Fine Dining",
    desc: "Exquisite multi-course experiences crafted with passion",
    image: "/fine-dining-restaurant-elegant-table-setting.jpg",
  },
  {
    icon: Coffee,
    title: "Cafe Culture",
    desc: "Artisan coffee & meaningful conversations",
    image: "/artisan-coffee-cafe-latte-art-premium.jpg",
  },
  {
    icon: Cake,
    title: "Celebrations",
    desc: "Birthday parties & special occasions made memorable",
    image: "/birthday-celebration-restaurant-party.jpg",
  },
  {
    icon: Wine,
    title: "Private Events",
    desc: "Exclusive gatherings in an intimate setting",
    image: "/private-dining-event-wine-elegant.jpg",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".services-title",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger animation with 3D flip
      const cards = cardsRef.current?.querySelectorAll(".service-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            rotateY: -90,
            opacity: 0,
            transformPerspective: 1000,
          },
          {
            rotateY: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animated grid
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

      // Morphing blobs
      gsap.to(blob1Ref.current, {
        x: 100,
        y: -60,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(blob2Ref.current, {
        x: -80,
        y: 80,
        scale: 1.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.5,
        },
      });

      // Continuous blob morphing
      gsap.to(blob1Ref.current, {
        borderRadius: "40% 60% 55% 45% / 50% 40% 60% 50%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob2Ref.current, {
        borderRadius: "60% 40% 45% 55% / 45% 60% 40% 55%",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animated lines
      gsap.to(".service-line-1", {
        scale: 1.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".service-line-2", {
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-aldees-black overflow-hidden">
      {/* Animated Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 229, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 229, 0, 0.2) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-b from-aldees-black via-aldees-black/98 to-aldees-black" />

      {/* Morphing Blobs */}
      <div
        ref={blob1Ref}
        className="absolute top-20 left-20 w-[400px] h-[400px] bg-aldees-yellow/10 rounded-full blur-[100px] pointer-events-none"
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-aldees-yellow/8 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Animated Lines at 45deg */}
      <div className="service-line-1 absolute top-0 left-1/4 w-px h-[141%] bg-linear-to-b from-transparent via-aldees-yellow/25 to-transparent origin-center -rotate-45" />
      <div className="service-line-2 absolute top-0 right-1/3 w-px h-[141%] bg-linear-to-b from-transparent via-aldees-yellow/25 to-transparent origin-center -rotate-45" />
      <div className="service-line-2 absolute top-0 right-1/12 w-px h-[141%] bg-linear-to-b from-transparent via-aldees-yellow/25 to-transparent origin-center -rotate-45" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border-2 border-aldees-yellow/25 pointer-events-none" />
      <div className="absolute bottom-1/4 right-16 w-24 h-24 border-2 border-aldees-yellow/30 rotate-45 pointer-events-none" />

      {/* Rotating circles */}
      <div
        className="absolute top-1/3 right-20 w-20 h-20 border border-aldees-yellow/20 rounded-full animate-spin"
        style={{ animationDuration: "20s" }}
      />
      <div
        className="absolute bottom-1/3 left-16 w-16 h-16 border border-aldees-yellow/25 rounded-full animate-spin"
        style={{ animationDuration: "15s", animationDirection: "reverse" }}
      />

      <div className="absolute inset-0 noise-overlay" />

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div className="services-title text-center mb-20">
          <span className="inline-block text-aldees-yellow text-sm tracking-[0.4em] uppercase mb-6 font-sans font-semibold">
            What We Offer
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-aldees-offwhite leading-[0.9]">
            More Than Just
            <span className="block text-aldees-yellow">A Meal</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card group relative h-[400px] overflow-hidden cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}>
              {/* Background Image */}
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-aldees-black via-aldees-black/60 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Icon */}
                <div className="w-16 h-16 bg-aldees-yellow/10 backdrop-blur-sm border border-aldees-yellow/30 flex items-center justify-center mb-4 group-hover:bg-aldees-yellow group-hover:border-aldees-yellow transition-all duration-500">
                  <service.icon className="w-8 h-8 text-aldees-yellow group-hover:text-aldees-black transition-colors duration-500" />
                </div>

                <h3 className="text-2xl font-display font-bold text-aldees-offwhite mb-2 group-hover:text-aldees-yellow transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-aldees-offwhite/70 text-sm leading-relaxed font-sans">
                  {service.desc}
                </p>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-aldees-yellow group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
