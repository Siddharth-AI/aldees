"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const hours = [
  { day: "Monday - Thursday", time: "11:00 AM - 10:00 PM" },
  { day: "Friday - Saturday", time: "11:00 AM - 11:00 PM" },
  { day: "Sunday", time: "12:00 PM - 9:00 PM" },
];

export default function LocationHours() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header stagger animation
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
              trigger: contentRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Contact items stagger with 3D effect
      const contactItems = contactRef.current?.children;
      if (contactItems) {
        gsap.fromTo(
          contactItems,
          { x: -100, opacity: 0, rotateY: -45 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Hours table reveal
      gsap.fromTo(
        hoursRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: hoursRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Map reveal with clip-path
      gsap.fromTo(
        mapRef.current,
        { 
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          scale: 0.9,
          rotateY: 15
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
          rotateY: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

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

      // Floating particles
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          const distance = 40 + (i * 12);
          
          gsap.to(particle, {
            y: direction * distance,
            x: -direction * (distance / 2),
            rotation: direction * 120,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2 + (i * 0.3),
            },
          });

          gsap.to(particle, {
            rotation: `+=${direction * 360}`,
            duration: 18 + (i * 4),
            repeat: -1,
            ease: "none",
          });
        });
      }

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
      gsap.to(".location-line-1", {
        scaleY: 1.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".location-line-2", {
        scaleY: 1.2,
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
      {/* Animated Grid */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 229, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 229, 0, 0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0',
        }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-aldees-black via-aldees-black/98 to-aldees-black" />

      {/* Morphing Blobs */}
      <div 
        ref={blob1Ref}
        className="absolute top-20 left-20 w-[400px] h-[400px] bg-aldees-yellow/10 rounded-full blur-[100px] pointer-events-none"
      />
      <div 
        ref={blob2Ref}
        className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-aldees-yellow/8 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Animated Lines */}
      <div className="location-line-1 absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-aldees-yellow/25 to-transparent origin-top" />
      <div className="location-line-2 absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-aldees-yellow/25 to-transparent origin-top" />

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[12%] w-4 h-4 bg-aldees-yellow/40 rounded-full" />
        <div className="absolute top-[45%] right-[15%] w-3 h-3 bg-aldees-yellow/50 rounded-full" />
        <div className="absolute top-[65%] left-[18%] w-3 h-3 bg-aldees-yellow/35 rounded-full" />
        <div className="absolute top-[80%] right-[22%] w-4 h-4 bg-aldees-yellow/45 rounded-full" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border-2 border-aldees-yellow/25 pointer-events-none" />
      <div className="absolute bottom-1/4 right-16 w-24 h-24 border-2 border-aldees-yellow/30 rotate-45 pointer-events-none" />
      
      {/* Rotating circles */}
      <div className="absolute top-1/3 right-20 w-20 h-20 border border-aldees-yellow/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute bottom-1/3 left-16 w-16 h-16 border border-aldees-yellow/25 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

      <div className="absolute inset-0 noise-overlay" />

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24">
          {/* Content */}
          <div ref={contentRef}>
            <div ref={headerRef}>
              <span className="inline-block text-aldees-yellow text-sm tracking-[0.3em] uppercase mb-4 sm:mb-6 font-sans font-semibold">
                Visit Us
              </span>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-aldees-offwhite mb-8 sm:mb-12 leading-[0.9]">
                Come Get
                <span className="block text-aldees-yellow">
                  Your Fix
                </span>
              </h2>
            </div>

            {/* Contact Info */}
            <div ref={contactRef} className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
              <div className="flex items-start gap-4 sm:gap-6 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-aldees-yellow flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-aldees-black" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl text-aldees-offwhite font-display font-bold mb-1">
                    Location
                  </h3>
                  <p className="text-sm sm:text-base text-aldees-offwhite/70 leading-relaxed font-sans">
                    123 Flavor Street, Downtown District
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-aldees-yellow flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-aldees-black" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl text-aldees-offwhite font-display font-bold mb-1">
                    Phone
                  </h3>
                  <p className="text-sm sm:text-base text-aldees-offwhite/70 font-sans">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-aldees-yellow flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-aldees-black" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl text-aldees-offwhite font-display font-bold mb-1">
                    Email
                  </h3>
                  <p className="text-sm sm:text-base text-aldees-offwhite/70 font-sans">hello@aldees.com</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div ref={hoursRef} className="mb-8 sm:mb-12">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-aldees-yellow" />
                <h3 className="text-xl sm:text-2xl font-display font-bold text-aldees-offwhite">
                  Opening Hours
                </h3>
              </div>

              <div className="border-2 border-aldees-yellow/30 bg-aldees-black/50 backdrop-blur-sm">
                {hours.map((schedule, index) => (
                  <div
                    key={index}
                    className={`flex flex-col sm:flex-row sm:justify-between py-4 sm:py-5 px-4 sm:px-6 hover:bg-aldees-yellow/10 transition-colors duration-300 ${
                      index !== hours.length - 1
                        ? "border-b-2 border-aldees-yellow/20"
                        : ""
                    }`}>
                    <span className="text-sm sm:text-base text-aldees-offwhite/80 font-sans font-medium mb-1 sm:mb-0">
                      {schedule.day}
                    </span>
                    <span className="text-sm sm:text-base text-aldees-yellow font-display font-bold">
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button className="group inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-10 py-4 sm:py-5 bg-aldees-yellow text-aldees-black text-base sm:text-lg tracking-wider uppercase font-display font-bold hover:bg-aldees-offwhite transition-all duration-500 w-full sm:w-auto justify-center sm:justify-start">
              Get Directions
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Map */}
          <div ref={mapRef} className="relative mt-8 lg:mt-0" style={{ perspective: "1000px" }}>
            <div className="relative aspect-square sm:aspect-video lg:aspect-auto lg:h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] bg-aldees-black overflow-hidden border-2 border-aldees-yellow/30 shadow-[0_0_80px_rgba(255,229,0,0.15)]">
              {/* Map Embed Placeholder */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                className="w-full h-full grayscale contrast-125 opacity-80"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ALDEE'S Location"
              />

              {/* Map Overlay */}
              <div className="absolute inset-0 bg-aldees-yellow/10 pointer-events-none" />

              {/* Location Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-aldees-yellow rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-aldees-black" />
                  </div>
                  <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-aldees-yellow rotate-45" />
                </div>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 w-full h-full border-2 sm:border-4 border-aldees-yellow/20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
