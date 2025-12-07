"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Leaf, Award, Clock, Shield } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: Leaf, title: "Fresh Ingredients", desc: "Farm to table quality" },
  { icon: Award, title: "Best Taste", desc: "Award-winning recipes" },
  { icon: Shield, title: "Hygienic Kitchen", desc: "5-star safety rated" },
  { icon: Clock, title: "Quick Service", desc: "Fast & efficient" },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with 3D effect
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          scale: 1.2,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Content stagger
      const contentElements = contentRef.current?.children
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Features grid animation
      const featureCards = featuresRef.current?.children
      if (featureCards) {
        gsap.fromTo(
          featureCards,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-40 bg-aldees-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-aldees-yellow/5 to-transparent" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column with 3D Tilt */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src="/chef-cooking-in-professional-kitchen--warm-lightin.jpg" alt="ALDEE'S Kitchen" className="w-full h-full object-cover" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-aldees-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-8 md:-right-16 bg-aldees-yellow p-8 shadow-2xl">
              <div className="text-aldees-black">
                <span
                  className="block text-6xl md:text-7xl font-bold leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  15+
                </span>
                <span className="text-sm tracking-wider uppercase font-medium">Years of Excellence</span>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-l-2 border-t-2 border-aldees-yellow/30" />
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="lg:pl-8">
            <span className="inline-block text-aldees-yellow text-sm tracking-[0.3em] uppercase mb-6 font-medium">
              Our Story
            </span>

            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-aldees-offwhite mb-8 leading-[0.9]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Where Bold
              <span className="block text-aldees-yellow">Flavor Meets</span>
              Soul
            </h2>

            <p className="text-lg text-aldees-offwhite/70 mb-6 leading-relaxed">
              Born from a passion for authentic flavors and a love for the classics, ALDEE'S brings you a dining
              experience that's unapologetically bold. We don't just serve food — we craft cravings.
            </p>

            <p className="text-lg text-aldees-offwhite/70 mb-10 leading-relaxed">
              Every dish tells a story of quality ingredients, time-honored recipes, and that secret something that
              keeps you coming back for more.
            </p>

            {/* Features Grid */}
            <div ref={featuresRef} className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 bg-aldees-black border border-aldees-yellow/10 hover:border-aldees-yellow/40 transition-all duration-500 cursor-pointer"
                  data-cursor-hover
                >
                  <feature.icon className="w-8 h-8 text-aldees-yellow mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3
                    className="text-aldees-offwhite font-bold text-lg mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-aldees-offwhite/50 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
