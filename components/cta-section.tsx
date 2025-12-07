"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Phone, ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax zoom
      gsap.fromTo(
        bgRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      )

      // Content reveal
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image with Parallax */}
      <div ref={bgRef} className="absolute inset-0">
        <img src="/restaurant-interior-warm-golden-lighting-premium-a.jpg" alt="Restaurant ambience" className="w-full h-full object-cover" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-aldees-black/70" />

      {/* Animated Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-aldees-yellow/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-aldees-yellow/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div ref={contentRef} className="text-center px-6 max-w-4xl">
          <span className="inline-block text-aldees-yellow text-sm tracking-[0.4em] uppercase mb-8">
            Ready To Experience?
          </span>

          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-aldees-offwhite mb-8 leading-[0.9]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Your Table
            <span className="block text-aldees-yellow">Awaits</span>
          </h2>

          <p className="text-xl text-aldees-offwhite/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Reserve your spot for an unforgettable dining experience at ALDEE'S Restaurant Cafe. Walk-ins welcome!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="tel:+15551234567"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-aldees-yellow text-aldees-black font-bold text-lg tracking-wider uppercase overflow-hidden relative"
            >
              <Phone className="w-5 h-5" />
              <span className="relative z-10">Call Now</span>
              <span className="absolute inset-0 bg-aldees-offwhite translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Phone className="w-5 h-5 absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
              <span className="absolute z-20 left-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Call Now
              </span>
            </a>

            <a
              href="/contact"
              className="group inline-flex items-center gap-4 px-10 py-5 border-2 border-aldees-yellow text-aldees-yellow font-bold text-lg tracking-wider uppercase hover:bg-aldees-yellow hover:text-aldees-black transition-all duration-500"
            >
              <span>Book A Table</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-aldees-yellow/50" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-aldees-yellow/50" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-aldees-yellow/50" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-aldees-yellow/50" />
    </section>
  )
}
