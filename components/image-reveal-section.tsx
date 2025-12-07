"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const images = [
  {
    src: "/gourmet-burger-premium-restaurant-dark-moody.jpg",
    title: "Signature Burgers",
    desc: "Crafted with premium ingredients",
  },
  {
    src: "/artisan-pasta-dish-italian-restaurant-elegant.jpg",
    title: "Artisan Pasta",
    desc: "Handmade with love",
  },
  {
    src: "/gourmet-dessert-chocolate-premium-plating.jpg",
    title: "Divine Desserts",
    desc: "Sweet perfection",
  },
]

export default function ImageRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll with image reveals
      imagesRef.current.forEach((img, i) => {
        if (!img) return

        const imageEl = img.querySelector(".reveal-image")
        const overlay = img.querySelector(".reveal-overlay")
        const content = img.querySelector(".reveal-content")

        // Image clip reveal from center
        gsap.fromTo(
          imageEl,
          { clipPath: "inset(50% 50% 50% 50%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: img,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Overlay slide out
        gsap.fromTo(
          overlay,
          { scaleX: 1 },
          {
            scaleX: 0,
            duration: 1,
            ease: "power4.inOut",
            delay: 0.3,
            scrollTrigger: {
              trigger: img,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Content fade in
        gsap.fromTo(
          content,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Parallax effect on scroll
        gsap.to(imageEl, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 bg-aldees-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-aldees-yellow/5 rounded-full blur-[200px]" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-aldees-yellow text-sm tracking-[0.4em] uppercase mb-6">
            Our Specialties
          </span>
          <h2
            className="text-5xl md:text-7xl font-bold text-aldees-offwhite"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Taste The <span className="text-aldees-yellow">Excellence</span>
          </h2>
        </div>

        {/* Images Grid */}
        <div ref={containerRef} className="grid md:grid-cols-3 gap-8">
          {images.map((image, i) => (
            <div
              key={i}
              ref={(el) => {
                imagesRef.current[i] = el
              }}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className="reveal-image absolute inset-0">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>

                {/* Yellow Overlay for reveal animation */}
                <div className="reveal-overlay absolute inset-0 bg-aldees-yellow origin-right" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-aldees-black via-aldees-black/20 to-transparent opacity-60" />

                {/* Content */}
                <div className="reveal-content absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-aldees-yellow text-sm tracking-[0.2em] uppercase mb-2 block">0{i + 1}</span>
                  <h3
                    className="text-3xl font-bold text-aldees-offwhite mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {image.title}
                  </h3>
                  <p className="text-aldees-offwhite/70">{image.desc}</p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-aldees-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
