"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    number: "01",
    title: "Premium Ambience",
    desc: "Immerse yourself in our carefully curated atmosphere where every detail speaks luxury.",
    image: "/luxury-restaurant-interior-warm-lighting-elegant.jpg",
  },
  {
    number: "02",
    title: "Master Chefs",
    desc: "Our culinary artists bring decades of experience from world-renowned kitchens.",
    image: "/professional-chef-cooking-flames-dark-kitchen.jpg",
  },
  {
    number: "03",
    title: "Fresh Ingredients",
    desc: "Sourced daily from local farms and premium suppliers for authentic taste.",
    image: "/fresh-vegetables-herbs-premium-ingredients-close-u.jpg",
  },
  {
    number: "04",
    title: "Perfect Pairings",
    desc: "Expert recommendations for beverages that complement every dish perfectly.",
    image: "/premium-beverages-coffee-artisan-drinks-restaurant.jpg",
  },
]

export default function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current.filter(Boolean)
      const totalWidth = panels.length * window.innerWidth

      // Horizontal scroll animation
      gsap.to(containerRef.current, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Animate each panel's content
      panels.forEach((panel, i) => {
        const image = panel?.querySelector(".panel-image")
        const content = panel?.querySelector(".panel-content")
        const number = panel?.querySelector(".panel-number")

        // Image parallax within panel
        gsap.fromTo(
          image,
          { x: 100, scale: 1.2 },
          {
            x: -100,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById("horizontalScroll") as gsap.core.Animation,
              start: "left right",
              end: "right left",
              scrub: 1,
            },
          },
        )

        // Content reveal
        gsap.fromTo(
          content?.children || [],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: panel,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Number scale
        gsap.fromTo(
          number,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 0.1,
            scrollTrigger: {
              trigger: panel,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-aldees-black">
      {/* Section Header */}
      <div className="absolute top-12 left-12 z-20">
        <span className="text-aldees-yellow text-sm tracking-[0.4em] uppercase">The Experience</span>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-1/2 left-12 -translate-y-1/2 z-20 hidden lg:block">
        <div className="w-1 h-40 bg-aldees-yellow/20 rounded-full overflow-hidden">
          <div className="w-full bg-aldees-yellow rounded-full scroll-progress-fill" style={{ height: "25%" }} />
        </div>
      </div>

      {/* Horizontal Container */}
      <div ref={containerRef} className="flex min-h-screen">
        {experiences.map((exp, i) => (
          <div
            key={i}
            ref={(el) => {
              panelsRef.current[i] = el
            }}
            className="relative w-screen h-screen flex-shrink-0 flex items-center"
          >
            {/* Background Number */}
            <div
              className="panel-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-bold text-aldees-yellow opacity-[0.03] pointer-events-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {exp.number}
            </div>

            <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="panel-content relative z-10 order-2 lg:order-1">
                <span
                  className="inline-block text-aldees-yellow text-7xl md:text-9xl font-bold opacity-30 mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {exp.number}
                </span>
                <h3
                  className="text-5xl md:text-7xl font-bold text-aldees-offwhite mb-6 leading-[0.9]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {exp.title}
                </h3>
                <p className="text-xl text-aldees-offwhite/70 max-w-md leading-relaxed">{exp.desc}</p>
              </div>

              {/* Image */}
              <div className="relative order-1 lg:order-2 h-[60vh] lg:h-[80vh] overflow-hidden">
                <div className="panel-image absolute inset-0">
                  <img src={exp.image || "/placeholder.svg"} alt={exp.title} className="w-full h-full object-cover" />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-aldees-black via-transparent to-transparent lg:bg-gradient-to-l" />

                {/* Frame */}
                <div className="absolute inset-8 border border-aldees-yellow/20 pointer-events-none" />
              </div>
            </div>

            {/* Separator Line */}
            {i < experiences.length - 1 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-aldees-yellow/30 to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="w-20 h-[1px] bg-aldees-yellow/50" />
        <span className="text-aldees-yellow/50 text-sm tracking-[0.2em] uppercase">Scroll to explore</span>
        <div className="w-20 h-[1px] bg-aldees-yellow/50" />
      </div>
    </section>
  )
}
