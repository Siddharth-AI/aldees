"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const hours = [
  { day: "Monday - Thursday", time: "11:00 AM - 10:00 PM" },
  { day: "Friday - Saturday", time: "11:00 AM - 11:00 PM" },
  { day: "Sunday", time: "12:00 PM - 9:00 PM" },
]

export default function LocationHours() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        mapRef.current,
        { x: 80, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 bg-aldees-offwhite overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Content */}
          <div ref={contentRef}>
            <span className="inline-block text-aldees-black/50 text-sm tracking-[0.3em] uppercase mb-6 font-medium">
              Visit Us
            </span>

            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-aldees-black mb-12 leading-[0.9]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Come Get
              <span className="block text-aldees-yellow" style={{ WebkitTextStroke: "2px #000" }}>
                Your Fix
              </span>
            </h2>

            {/* Contact Info */}
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-aldees-black flex items-center justify-center flex-shrink-0 group-hover:bg-aldees-yellow transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-aldees-yellow group-hover:text-aldees-black transition-colors duration-300" />
                </div>
                <div>
                  <h3
                    className="text-xl text-aldees-black font-bold mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Location
                  </h3>
                  <p className="text-aldees-black/70 leading-relaxed">
                    123 Flavor Street, Downtown District
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-aldees-black flex items-center justify-center flex-shrink-0 group-hover:bg-aldees-yellow transition-colors duration-300">
                  <Phone className="w-6 h-6 text-aldees-yellow group-hover:text-aldees-black transition-colors duration-300" />
                </div>
                <div>
                  <h3
                    className="text-xl text-aldees-black font-bold mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Phone
                  </h3>
                  <p className="text-aldees-black/70">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-aldees-black flex items-center justify-center flex-shrink-0 group-hover:bg-aldees-yellow transition-colors duration-300">
                  <Mail className="w-6 h-6 text-aldees-yellow group-hover:text-aldees-black transition-colors duration-300" />
                </div>
                <div>
                  <h3
                    className="text-xl text-aldees-black font-bold mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Email
                  </h3>
                  <p className="text-aldees-black/70">hello@aldees.com</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <Clock className="w-6 h-6 text-aldees-black" />
                <h3 className="text-2xl font-bold text-aldees-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Opening Hours
                </h3>
              </div>

              <div className="border-2 border-aldees-black">
                {hours.map((schedule, index) => (
                  <div
                    key={index}
                    className={`flex justify-between py-5 px-6 ${
                      index !== hours.length - 1 ? "border-b-2 border-aldees-black" : ""
                    }`}
                  >
                    <span className="text-aldees-black/80 font-medium">{schedule.day}</span>
                    <span className="text-aldees-black font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button className="group inline-flex items-center gap-4 px-10 py-5 bg-aldees-black text-aldees-yellow text-lg tracking-wider uppercase font-bold hover:bg-aldees-yellow hover:text-aldees-black transition-all duration-500">
              Get Directions
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Map */}
          <div ref={mapRef} className="relative">
            <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[500px] bg-aldees-black overflow-hidden">
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
                  <div className="w-16 h-16 bg-aldees-yellow rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <MapPin className="w-8 h-8 text-aldees-black" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-aldees-yellow rotate-45" />
                </div>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-aldees-black -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
