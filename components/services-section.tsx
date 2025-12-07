"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Utensils, Coffee, Cake, Wine } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

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
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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
          },
        },
      )

      // Cards stagger animation with 3D flip
      const cards = cardsRef.current?.querySelectorAll(".service-card")
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
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 bg-aldees-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FFE500 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div className="services-title text-center mb-20">
          <span className="inline-block text-aldees-yellow text-sm tracking-[0.4em] uppercase mb-6">What We Offer</span>
          <h2
            className="text-5xl md:text-7xl font-bold text-aldees-offwhite leading-[0.9]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            More Than Just
            <span className="block text-aldees-yellow">A Meal</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card group relative h-[400px] overflow-hidden cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
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

                <h3
                  className="text-2xl font-bold text-aldees-offwhite mb-2 group-hover:text-aldees-yellow transition-colors duration-300"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {service.title}
                </h3>

                <p className="text-aldees-offwhite/70 text-sm leading-relaxed">{service.desc}</p>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-aldees-yellow group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
