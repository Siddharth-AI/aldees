"use client";

import { useState, useRef, useEffect } from "react";
import { menuCategories, menuItems } from "@/lib/menu-data";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("starters");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categoryButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const menuGridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeCategoryIndicatorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax effect
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

      // Category navigation animation
      gsap.fromTo(
        ".category-nav",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".category-nav",
            start: "top 90%",
          },
        }
      );

      // Initial cards animation
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: menuGridRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const activeButton = categoryButtonsRef.current.find(
      (btn) => btn?.getAttribute("data-category") === activeCategory
    );

    if (activeButton && activeCategoryIndicatorRef.current) {
      const { offsetLeft, offsetWidth } = activeButton;
      gsap.to(activeCategoryIndicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [activeCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory || isTransitioning) return;

    setIsDropdownOpen(false);
    setIsTransitioning(true);

    const exitTimeline = gsap.timeline({
      onComplete: () => {
        setActiveCategory(categoryId);

        gsap.fromTo(
          cardsRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
            rotateX: -10,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.1,
            stagger: {
              amount: 0.2,
              from: "start",
              ease: "power2.out",
            },
            ease: "power2.out",
            onComplete: () => setIsTransitioning(false),
          }
        );
      },
    });

    exitTimeline.to(cardsRef.current, {
      opacity: 0,
      y: -20,
      scale: 0.97,
      duration: 0.5,
      stagger: {
        amount: 0.1,
        from: "end",
      },
      ease: "power2.in",
    });
  };

  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    if (isEntering) {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(card.querySelector(".card-image"), {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(card.querySelector(".card-overlay"), {
        opacity: 1,
        duration: 0.3,
      });
    } else {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(card.querySelector(".card-image"), {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(card.querySelector(".card-overlay"), {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  const currentItems = menuItems[activeCategory as keyof typeof menuItems];
  const currentCategoryObj = menuCategories.find(
    (cat) => cat.id === activeCategory
  );

  return (
    <section ref={sectionRef} className="relative bg-aldees-black min-h-screen">
      <div
        ref={heroRef}
        className="relative h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden">
        <img
          src="menu-bg.png"
          alt="Menu Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-aldees-black/60 via-aldees-black/40 to-aldees-black" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center hero-content">
            <span className="hero-subtitle inline-block text-aldees-yellow text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] uppercase mb-4 md:mb-6 font-medium">
              Our Menu
            </span>
            <h1
              className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-aldees-offwhite leading-[0.85]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Culinary
              <span className="block text-aldees-yellow">Excellence</span>
            </h1>
          </div>
        </div>

        {/* Decorative Elements - Hidden on mobile */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-aldees-black to-transparent" />
        <div className="hidden md:block absolute top-8 left-8 w-16 h-16 lg:w-24 lg:h-24 border-l-2 border-t-2 border-aldees-yellow/30" />
        <div className="hidden md:block absolute top-8 right-8 w-16 h-16 lg:w-24 lg:h-24 border-r-2 border-t-2 border-aldees-yellow/30" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
        {/* Description */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <p className="text-base md:text-lg lg:text-xl text-aldees-offwhite/60 max-w-3xl mx-auto leading-relaxed px-4">
            Crafted with passion, served with excellence. Explore our handpicked
            selection of culinary masterpieces, each dish prepared with the
            finest ingredients and decades of expertise.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-12 md:mb-16">
          <div className="max-w-4xl mx-auto">
            {/* Mobile/Tablet Dropdown (hidden on lg+) */}
            <div
              ref={dropdownRef}
              className="lg:hidden relative"
              style={{ zIndex: 40 }}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full glass rounded-2xl p-4 flex items-center justify-between text-aldees-offwhite hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentCategoryObj?.icon}</span>
                  <span className="text-lg font-semibold">
                    {currentCategoryObj?.name}
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200"
                  style={{ zIndex: 41 }}>
                  {menuCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      disabled={isTransitioning}
                      className={`w-full px-4 py-3 rounded-xl font-semibold text-base transition-all duration-200 flex items-center gap-3 disabled:cursor-not-allowed ${
                        activeCategory === category.id
                          ? "bg-aldees-yellow text-black"
                          : "text-aldees-offwhite hover:bg-white/10"
                      }`}>
                      <span className="text-xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Navigation (hidden on mobile/tablet) */}
            <div className="hidden lg:block category-nav">
              <div className="glass rounded-full p-2 relative overflow-hidden">
                {/* Active indicator */}
                <div
                  ref={activeCategoryIndicatorRef}
                  className="absolute top-2 bottom-2 bg-aldees-yellow rounded-full transition-all duration-75 ease-in-out"
                  style={{ width: 0 }}
                />

                {/* Category buttons */}
                <div className="relative z-10 flex flex-wrap justify-center gap-2">
                  {menuCategories.map((category, index) => (
                    <button
                      key={category.id}
                      ref={(el) => {
                        categoryButtonsRef.current[index] = el;
                      }}
                      data-category={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      disabled={isTransitioning}
                      className={`px-6 py-3 rounded-full font-semibold text-base transition-all duration-75 ease-in-out disabled:cursor-not-allowed flex items-center gap-2 ${
                        activeCategory === category.id
                          ? "text-black"
                          : "text-aldees-offwhite hover:text-aldees-yellow"
                      }`}>
                      <span className="text-xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div
          ref={menuGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {currentItems.map((item, index) => (
            <div
              key={`${activeCategory}-${item.id}`}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
              className="group relative bg-card rounded-2xl overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}>
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-muted">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="card-image object-cover transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-3 md:top-4 left-3 md:left-4 flex gap-1.5 md:gap-2 z-10">
                  {item.isSpicy && (
                    <span className="px-2 md:px-3 py-0.5 md:py-1 bg-red-500/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold rounded-full">
                      🌶️ Spicy
                    </span>
                  )}
                  {item.isVeg && (
                    <span className="px-2 md:px-3 py-0.5 md:py-1 bg-green-500/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold rounded-full">
                      🌱 Veg
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute top-3 md:top-4 right-3 md:right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full z-10">
                  <span className="text-aldees-yellow text-xs md:text-sm">
                    ⭐
                  </span>
                  <span className="text-white text-xs md:text-sm font-bold">
                    {item.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 space-y-2 md:space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg md:text-xl text-foreground leading-tight line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-aldees-yellow font-bold text-lg md:text-xl shrink-0">
                    {item.price}
                  </span>
                </div>

                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] md:text-xs text-muted-foreground flex items-center gap-1">
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {item.cookTime}
                  </span>

                  {/* Action Button (Hidden initially, shown on hover) */}
                  <button
                    className="card-action-btn px-3 md:px-4 py-1.5 md:py-2 bg-aldees-yellow text-black font-bold rounded-full text-xs md:text-sm hover:bg-aldees-yellow/90 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic here
                    }}>
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">
              No items available in this category
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
