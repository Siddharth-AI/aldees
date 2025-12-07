"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    name: "Marcus Johnson",
    role: "Food Critic",
    quote:
      "ALDEE'S isn't just food — it's a whole mood. The smash burger is absolutely unreal. I've tried to find something better, but nothing comes close. A must-visit destination.",
    rating: 5,
    image: "/professional-man-portrait.png",
  },
  {
    id: 2,
    name: "Sarah Thompson",
    role: "Regular Customer",
    quote:
      "The vintage vibes pulled me in, but the flavor kept me coming back. That truffle mac & cheese is now my weekly ritual. The ambiance is just perfect.",
    rating: 5,
    image: "/professional-woman-portrait.png",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Food Blogger",
    quote:
      "In a city full of options, ALDEE'S stands out with authentic character and flavors that actually deliver on the hype. This is the real deal.",
    rating: 5,
    image: "/young-man-casual-portrait.png",
  },
  {
    id: 4,
    name: "Emily Kim",
    role: "Local Guide",
    quote:
      "Brought my crew here for a birthday — best decision ever. The Nashville hot chicken changed my life. Not exaggerating. Absolutely incredible.",
    rating: 5,
    image: "/smiling-young-woman-portrait.png",
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        },
      )

      gsap.fromTo(
        sliderRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 bg-aldees-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #ffe500 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-block text-aldees-yellow text-sm tracking-[0.3em] uppercase mb-6 font-medium">
            Testimonials
          </span>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-aldees-offwhite leading-[0.9]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            What Our
            <span className="block text-aldees-yellow">Guests Say</span>
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div ref={sliderRef} className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="relative bg-gradient-to-br from-aldees-yellow/10 to-transparent border border-aldees-yellow/20 p-10 md:p-16">
              {/* Quote Icon */}
              <Quote className="absolute top-8 right-8 w-16 h-16 text-aldees-yellow/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-aldees-yellow fill-aldees-yellow" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote
                className="text-2xl md:text-3xl text-aldees-offwhite leading-relaxed mb-10"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                "{testimonials[activeIndex].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-aldees-yellow">
                  <img
                    src={testimonials[activeIndex].image || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4
                    className="text-xl text-aldees-offwhite font-bold"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-aldees-yellow/80 text-sm tracking-wider uppercase">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-aldees-yellow/10" />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
              {/* Dots */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-aldees-yellow w-10"
                        : "bg-aldees-offwhite/30 hover:bg-aldees-offwhite/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-4">
                <button
                  onClick={prevSlide}
                  className="w-14 h-14 border border-aldees-yellow/30 flex items-center justify-center text-aldees-yellow hover:bg-aldees-yellow hover:text-aldees-black transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-14 h-14 border border-aldees-yellow/30 flex items-center justify-center text-aldees-yellow hover:bg-aldees-yellow hover:text-aldees-black transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
