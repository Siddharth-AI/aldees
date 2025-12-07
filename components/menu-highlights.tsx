"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    id: 1,
    name: "The Classic Smash",
    description: "Double patty, caramelized onions, secret sauce, aged cheddar",
    price: "$14.99",
    category: "Burgers",
    image: "/gourmet-smash-burger--melted-cheese--dark-moody-fo.jpg",
  },
  {
    id: 2,
    name: "Crispy Wings Platter",
    description: "Golden fried wings, house dry rub, blue cheese dip",
    price: "$12.99",
    category: "Starters",
    image: "/crispy-chicken-wings--golden-brown--rustic-plate--.jpg",
  },
  {
    id: 3,
    name: "BBQ Pulled Pork",
    description: "12-hour smoked pork, tangy slaw, brioche bun",
    price: "$15.99",
    category: "Sandwiches",
    image: "/bbq-pulled-pork-sandwich--coleslaw--brioche-bun--d.jpg",
  },
  {
    id: 4,
    name: "Truffle Mac & Cheese",
    description: "Three-cheese blend, truffle oil, crispy breadcrumbs",
    price: "$11.99",
    category: "Sides",
    image: "/truffle-mac-and-cheese--creamy--golden-top--food-p.jpg",
  },
];

export default function MenuHighlights() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with stagger
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.fromTo(
          headerElements,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards animation with 3D effect
      const cards = cardsRef.current?.querySelectorAll(".menu-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, rotateX: 45, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

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

      // Floating particles
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          const distance = 40 + i * 15;

          gsap.to(particle, {
            y: direction * distance,
            x: -direction * (distance / 2),
            rotation: direction * 90,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2 + i * 0.3,
            },
          });

          gsap.to(particle, {
            rotation: `+=${direction * 360}`,
            duration: 15 + i * 3,
            repeat: -1,
            ease: "none",
          });
        });
      }

      // Floating decorative element
      gsap.to(".menu-float", {
        y: -30,
        x: 20,
        rotation: 180,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Morphing blobs
      gsap.to(blob1Ref.current, {
        x: 150,
        y: -80,
        scale: 1.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(blob2Ref.current, {
        x: -100,
        y: 100,
        scale: 1.3,
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
        borderRadius: "45% 55% 60% 40% / 50% 45% 55% 50%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob2Ref.current, {
        borderRadius: "55% 45% 40% 60% / 45% 55% 45% 55%",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animated lines
      gsap.to(".menu-line-1", {
        scaleY: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".menu-line-2", {
        scaleY: 1.3,
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
      className="relative py-32 md:py-40 bg-aldees-black overflow-hidden">
      {/* Animated Grid Background */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 229, 0, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 229, 0, 0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[8%] w-3 h-3 bg-aldees-yellow/30 rounded-full" />
        <div className="absolute top-[35%] right-[12%] w-2 h-2 bg-aldees-yellow/40 rounded-full" />
        <div className="absolute top-[55%] left-[15%] w-2 h-2 bg-aldees-yellow/25 rounded-full" />
        <div className="absolute top-[75%] right-[20%] w-3 h-3 bg-aldees-yellow/35 rounded-full" />
        <div className="absolute top-[25%] left-[75%] w-2 h-2 bg-aldees-yellow/30 rounded-full" />
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-aldees-black via-aldees-black/98 to-aldees-black" />

      {/* Morphing Blobs */}
      <div
        ref={blob1Ref}
        className="absolute top-10 left-10 w-[350px] h-[350px] bg-aldees-yellow/8 rounded-full blur-[100px] pointer-events-none"
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-aldees-yellow/6 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Animated Lines */}
      <div className="menu-line-1 absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-aldees-yellow/20 to-transparent origin-top" />
      <div className="menu-line-2 absolute top-0 right-1/3 w-px h-full bg-linear-to-b from-transparent via-aldees-yellow/20 to-transparent origin-top" />

      <div className="menu-float absolute top-20 right-10 w-32 h-32 border-2 border-aldees-yellow/30 pointer-events-none" />

      {/* Rotating circles */}
      <div
        className="absolute top-1/2 left-10 w-24 h-24 border border-aldees-yellow/20 rounded-full animate-spin"
        style={{ animationDuration: "20s" }}
      />
      <div
        className="absolute bottom-1/4 right-16 w-16 h-16 border border-aldees-yellow/25 rounded-full animate-spin"
        style={{ animationDuration: "15s", animationDirection: "reverse" }}
      />

      <div className="absolute inset-0 noise-overlay" />

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div>
            <span className="inline-block text-aldees-yellow text-sm tracking-[0.3em] uppercase mb-4 font-sans font-semibold">
              Our Menu
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-aldees-offwhite leading-[0.9]">
              Signature
              <span className="block text-aldees-yellow">Bestsellers</span>
            </h2>
          </div>
          <p className="text-lg text-aldees-offwhite/70 max-w-md font-sans">
            Hand-picked favorites that keep our regulars coming back. Bold
            flavors, honest ingredients, zero compromises.
          </p>
        </div>

        {/* Menu Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* View Full Menu */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center gap-4 px-10 py-5 bg-aldees-yellow text-aldees-black text-lg tracking-wider uppercase font-display font-bold hover:bg-aldees-offwhite transition-all duration-500">
            View Full Menu
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

function MenuCard({ item }: { item: MenuItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) / 20;
    const rotateY = (centerX - e.clientX) / 20;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    gsap.to(imageRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
  };

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="menu-card group relative bg-aldees-black overflow-hidden cursor-pointer border border-aldees-yellow/20"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      data-cursor-hover>
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10 bg-aldees-yellow text-aldees-black px-3 py-1 text-xs tracking-wider uppercase font-sans font-bold">
        {item.category}
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <div ref={imageRef} className="w-full h-full">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-aldees-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 border-t-4 border-aldees-yellow bg-aldees-black min-h-[140px] flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-display font-bold text-aldees-offwhite leading-tight">
            {item.name}
          </h3>
          <span className="text-2xl font-display font-bold text-aldees-yellow ml-3 shrink-0">
            {item.price}
          </span>
        </div>
        <p className="text-sm text-aldees-offwhite/60 leading-relaxed font-sans">
          {item.description}
        </p>
      </div>

      {/* Hover Border */}
      <div className="absolute inset-0 border-4 border-aldees-yellow scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
    </div>
  );
}
