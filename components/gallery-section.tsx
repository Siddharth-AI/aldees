"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = {
  ambience: [
    {
      id: 1,
      src: "/luxury-restaurant-interior-vintage-lighting-warm-a.jpg",
      alt: "Restaurant Interior",
    },
    {
      id: 2,
      src: "/restaurant-bar-area-vintage-style-neon-lights-cock.jpg",
      alt: "Bar Area",
    },
    {
      id: 3,
      src: "/restaurant-dining-area-vintage-decor-brick-walls-c.jpg",
      alt: "Dining Area",
    },
    {
      id: 4,
      src: "/restaurant-outdoor-seating-patio-evening-lights-ro.jpg",
      alt: "Outdoor Seating",
    },
    {
      id: 5,
      src: "/private-dining-room-elegant-chandelier-intimate.jpg",
      alt: "Private Dining",
    },
    {
      id: 6,
      src: "/restaurant-entrance-vintage-signage-neon-night.jpg",
      alt: "Restaurant Entrance",
    },
  ],
  food: [
    {
      id: 7,
      src: "/gourmet-burger-cheese-melting-premium-food-photogr.jpg",
      alt: "Signature Burger",
    },
    {
      id: 8,
      src: "/food-gallery1.png?height=600&width=800",
      alt: "BBQ Pulled Pork",
    },
    {
      id: 9,
      src: "/food-gallery2.png?height=600&width=800",
      alt: "Loaded Fries",
    },
    {
      id: 10,
      src: "/food-gallery3.png?height=600&width=800",
      alt: "Classic Milkshake",
    },
    {
      id: 11,
      src: "/food-gallery4.png?height=600&width=800",
      alt: "Nashville Hot Chicken",
    },
    {
      id: 12,
      src: "/crispy-chicken-wings-golden-sauce-food-photography.jpg",
      alt: "Crispy Wings",
    },
    {
      id: 13,
      src: "/truffle-mac-and-cheese-creamy-premium-food-photogr.jpg",
      alt: "Truffle Mac & Cheese",
    },
  ],
};

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"ambience" | "food">("ambience");
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    index: number;
  } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const currentImages = galleryImages[activeTab];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      const heroImage = heroRef.current?.querySelector("img");
      if (heroImage) {
        gsap.to(heroImage, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Hero content animations
      const heroSubtitle = heroRef.current?.querySelector(".hero-subtitle");
      const heroTitle = heroRef.current?.querySelector(".hero-title");

      if (heroSubtitle) {
        gsap.fromTo(
          heroSubtitle,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
        );
      }

      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, delay: 0.6, ease: "power3.out" }
        );
      }

      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const images = gridRef.current.querySelectorAll(".gallery-item");
      gsap.fromTo(
        images,
        { y: 100, opacity: 0, scale: 0.8, rotateY: 15 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [activeTab]);

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!lightboxImage) return;
    const newIndex =
      direction === "prev"
        ? (lightboxImage.index - 1 + currentImages.length) %
          currentImages.length
        : (lightboxImage.index + 1) % currentImages.length;
    setLightboxImage({ src: currentImages[newIndex].src, index: newIndex });
  };

  return (
    <section ref={sectionRef} className="relative bg-aldees-black min-h-screen">
      {/* Hero Section with Parallax Background */}
      <div ref={heroRef} className="relative h-[60vh] overflow-hidden">
        <img
          src="/bg-gallery.png?height=1080&width=1920"
          alt="Gallery Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-aldees-black/60 via-aldees-black/40 to-aldees-black" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center hero-content">
            <span className="hero-subtitle inline-block text-aldees-yellow text-sm tracking-[0.4em] uppercase mb-6 font-medium">
              Our Gallery
            </span>
            <h1
              className="hero-title text-6xl md:text-8xl lg:text-9xl font-bold text-aldees-offwhite leading-[0.85]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Visual
              <span className="block text-aldees-yellow">Journey</span>
            </h1>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-aldees-black to-transparent" />
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-aldees-yellow/30" />
        <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-aldees-yellow/30" />
      </div>

      <div className="relative container mx-auto px-6 py-20">
        {/* Description */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-xl text-aldees-offwhite/60 max-w-3xl mx-auto leading-relaxed">
            Step inside ALDEE'S and experience the perfect blend of vintage
            charm and culinary excellence through our lens. Every corner tells a
            story, every dish is a masterpiece.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab("ambience")}
            className={`relative px-10 py-5 text-lg tracking-wider uppercase font-bold transition-all duration-500 overflow-hidden font-sans ${
              activeTab === "ambience"
                ? "bg-aldees-yellow text-aldees-black"
                : "border-2 border-aldees-yellow/30 text-aldees-offwhite hover:border-aldees-yellow"
            }`}>
            Restaurant
          </button>
          <button
            onClick={() => setActiveTab("food")}
            className={`relative px-10 py-5 text-lg tracking-wider uppercase font-bold transition-all duration-500 overflow-hidden font-sans ${
              activeTab === "food"
                ? "bg-aldees-yellow text-aldees-black"
                : "border-2 border-aldees-yellow/30 text-aldees-offwhite hover:border-aldees-yellow"
            }`}>
            Food
          </button>
        </div>

        {/* Gallery Grid with Masonry Effect */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item group relative overflow-hidden cursor-pointer ${
                index === 0 || index === 5 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
              onClick={() => setLightboxImage({ src: image.src, index })}
              style={{ perspective: "1000px" }}>
              <div
                className={`relative ${
                  index === 0 || index === 5 ? "aspect-square" : "aspect-4/3"
                } overflow-hidden`}>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-aldees-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Title on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span
                    className="text-2xl text-aldees-offwhite font-bold tracking-wider"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {image.alt}
                  </span>
                  <div className="w-12 h-0.5 bg-aldees-yellow mt-2" />
                </div>

                {/* Corner Frame */}
                <div className="absolute inset-4 border border-aldees-yellow/0 group-hover:border-aldees-yellow/50 transition-all duration-500 pointer-events-none" />

                {/* View Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-aldees-yellow/90 rounded-full flex items-center justify-center opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                  <svg
                    className="w-6 h-6 text-aldees-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-aldees-black/98 flex items-center justify-center p-6"
          onClick={() => setLightboxImage(null)}>
          {/* Close Button */}
          <button
            className="absolute top-8 right-8 w-14 h-14 bg-aldees-yellow text-aldees-black flex items-center justify-center hover:bg-aldees-offwhite transition-colors duration-300 z-10"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox">
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-aldees-yellow/10 border border-aldees-yellow/30 text-aldees-yellow flex items-center justify-center hover:bg-aldees-yellow hover:text-aldees-black transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
            aria-label="Previous image">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-aldees-yellow/10 border border-aldees-yellow/30 text-aldees-yellow flex items-center justify-center hover:bg-aldees-yellow hover:text-aldees-black transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            aria-label="Next image">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <img
            src={lightboxImage.src || "/placeholder.svg"}
            alt="Gallery preview"
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-aldees-offwhite/60 text-sm tracking-wider">
            {lightboxImage.index + 1} / {currentImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
