"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const parallaxTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Text reveal
      gsap.fromTo(
        textRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Horizontal scrolling text
      gsap.to(parallaxTextRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[700px] overflow-hidden bg-aldees-black">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 -top-20 -bottom-20">
        <img src="/vintage-restaurant-interior-panoramic-dark-moody-a.jpg" alt="ALDEE'S Experience" className="w-full h-full object-cover" />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-aldees-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-aldees-black via-transparent to-aldees-black" />

      {/* Scrolling Text Background */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
        <div
          ref={parallaxTextRef}
          className="whitespace-nowrap text-[20vw] font-bold text-aldees-yellow/5 leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          EXPERIENCE • FLAVOR • TRADITION • QUALITY • EXPERIENCE • FLAVOR • TRADITION • QUALITY •
        </div>
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <span className="inline-block text-aldees-yellow text-sm tracking-[0.4em] uppercase mb-8 font-medium">
          The Experience
        </span>

        <h2
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-aldees-offwhite mb-8 max-w-6xl leading-[0.9] glow-yellow"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          You Deserve
          <span className="block text-aldees-yellow glow-yellow-intense">This Goodness</span>
        </h2>

        <p className="text-lg md:text-xl text-aldees-offwhite/70 max-w-2xl mb-12 leading-relaxed">
          Settle into our vintage-inspired space, where every corner tells a story and every bite creates a memory. This
          is dining done differently.
        </p>

        <button className="group relative px-12 py-5 bg-transparent border-2 border-aldees-yellow text-aldees-yellow font-bold text-lg tracking-wider uppercase overflow-hidden transition-all duration-500 hover:text-aldees-black">
          <span className="relative z-10">Reserve Your Table</span>
          <div className="absolute inset-0 bg-aldees-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </button>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l-2 border-t-2 border-aldees-yellow/20" />
      <div className="absolute top-12 right-12 w-24 h-24 border-r-2 border-t-2 border-aldees-yellow/20" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border-l-2 border-b-2 border-aldees-yellow/20" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r-2 border-b-2 border-aldees-yellow/20" />
    </section>
  )
}
