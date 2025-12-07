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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll(".menu-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-aldees-offwhite overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />

      <div className="video-float-1 absolute top-20 left-10 w-32 h-32 bg-aldees-yellow/10 rounded-full pointer-events-none z-50 animate-bounce" />

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div>
            <span className="inline-block text-aldees-black/50 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              Our Menu
            </span>
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-aldees-black leading-[0.9]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Signature
              <span
                className="block text-aldees-yellow"
                style={{ WebkitTextStroke: "2px #000" }}>
                Bestsellers
              </span>
            </h2>
          </div>
          <p className="text-lg text-aldees-black/60 max-w-md">
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
          <button className="group inline-flex items-center gap-4 px-10 py-5 bg-aldees-black text-aldees-yellow text-lg tracking-wider uppercase font-bold hover:bg-aldees-yellow hover:text-aldees-black transition-all duration-500">
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
      className="menu-card group relative bg-white overflow-hidden cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      data-cursor-hover>
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10 bg-aldees-black text-aldees-yellow px-3 py-1 text-xs tracking-wider uppercase font-bold">
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
        <div className="absolute inset-0 bg-gradient-to-t from-aldees-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 border-t-4 border-aldees-yellow">
        <div className="flex justify-between items-start mb-3">
          <h3
            className="text-xl font-bold text-aldees-black leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {item.name}
          </h3>
          <span
            className="text-2xl font-bold text-aldees-yellow ml-3"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {item.price}
          </span>
        </div>
        <p className="text-sm text-aldees-black/60 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Hover Border */}
      <div className="absolute inset-0 border-4 border-aldees-yellow scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
    </div>
  );
}
