"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter, ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    date: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(heroRef.current?.querySelector("img"), {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Form reveal
      gsap.fromTo(
        formRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        },
      )

      // Info reveal
      gsap.fromTo(
        infoRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          },
        },
      )

      // Contact items stagger
      const items = infoRef.current?.querySelectorAll(".contact-item")
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2 + i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 2000)
  }

  return (
    <section ref={sectionRef} className="relative bg-aldees-black min-h-screen">
      {/* Hero Section with Parallax Background */}
      <div ref={heroRef} className="relative h-[50vh] overflow-hidden">
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-aldees-black/70 via-aldees-black/50 to-aldees-black" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="inline-block text-aldees-yellow text-sm tracking-[0.4em] uppercase mb-6 font-medium">
              Get In Touch
            </span>
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-aldees-offwhite leading-[0.85]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Contact
              <span className="block text-aldees-yellow">Us</span>
            </h1>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-aldees-black to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-aldees-yellow/30" />

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative bg-aldees-black/50 backdrop-blur-sm border border-aldees-yellow/10 p-8 md:p-12"
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-aldees-offwhite mb-8"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Make A Reservation
              </h2>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="group">
                  <label className="block text-aldees-offwhite/60 text-xs tracking-wider uppercase mb-3">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-aldees-black/50 border border-aldees-yellow/20 px-5 py-4 text-aldees-offwhite placeholder-aldees-offwhite/30 focus:border-aldees-yellow focus:outline-none transition-colors duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-aldees-offwhite/60 text-xs tracking-wider uppercase mb-3">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-aldees-black/50 border border-aldees-yellow/20 px-5 py-4 text-aldees-offwhite placeholder-aldees-offwhite/30 focus:border-aldees-yellow focus:outline-none transition-colors duration-300"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-aldees-offwhite/60 text-xs tracking-wider uppercase mb-3">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-aldees-black/50 border border-aldees-yellow/20 px-5 py-4 text-aldees-offwhite placeholder-aldees-offwhite/30 focus:border-aldees-yellow focus:outline-none transition-colors duration-300"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-aldees-offwhite/60 text-xs tracking-wider uppercase mb-3">Guests</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-aldees-black/50 border border-aldees-yellow/20 px-5 py-4 text-aldees-offwhite focus:border-aldees-yellow focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                    <option value="9+">9+ Guests</option>
                  </select>
                </div>
                <div>
                  <label className="block text-aldees-offwhite/60 text-xs tracking-wider uppercase mb-3">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-aldees-black/50 border border-aldees-yellow/20 px-5 py-4 text-aldees-offwhite focus:border-aldees-yellow focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-aldees-offwhite/60 text-xs tracking-wider uppercase mb-3">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-aldees-black/50 border border-aldees-yellow/20 px-5 py-4 text-aldees-offwhite placeholder-aldees-offwhite/30 focus:border-aldees-yellow focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Any special requests or dietary requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full inline-flex items-center justify-center gap-4 px-12 py-5 bg-aldees-yellow text-aldees-black text-lg tracking-wider uppercase font-bold overflow-hidden disabled:opacity-70"
              >
                <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
                <Send className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                <span className="absolute inset-0 bg-aldees-offwhite translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-10">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-aldees-offwhite mb-8"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Visit Us
              </h2>
              <p className="text-aldees-offwhite/60 text-lg leading-relaxed">
                Have a question, feedback, or want to make a reservation? We'd love to hear from you. Walk-ins are
                always welcome!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="contact-item flex items-start gap-5 group p-4 border border-transparent hover:border-aldees-yellow/20 transition-all duration-300">
                <div className="w-14 h-14 bg-aldees-yellow/10 border border-aldees-yellow/30 flex items-center justify-center flex-shrink-0 group-hover:bg-aldees-yellow group-hover:border-aldees-yellow transition-all duration-300">
                  <MapPin className="w-6 h-6 text-aldees-yellow group-hover:text-aldees-black transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-aldees-offwhite font-bold mb-1 text-lg">Address</h4>
                  <p className="text-aldees-offwhite/60">
                    123 Flavor Street, Downtown District
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="contact-item flex items-start gap-5 group p-4 border border-transparent hover:border-aldees-yellow/20 transition-all duration-300">
                <div className="w-14 h-14 bg-aldees-yellow/10 border border-aldees-yellow/30 flex items-center justify-center flex-shrink-0 group-hover:bg-aldees-yellow group-hover:border-aldees-yellow transition-all duration-300">
                  <Phone className="w-6 h-6 text-aldees-yellow group-hover:text-aldees-black transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-aldees-offwhite font-bold mb-1 text-lg">Phone</h4>
                  <p className="text-aldees-offwhite/60">(555) 123-4567</p>
                  <a
                    href="tel:+15551234567"
                    className="inline-flex items-center gap-2 text-aldees-yellow text-sm mt-2 hover:underline"
                  >
                    Call Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="contact-item flex items-start gap-5 group p-4 border border-transparent hover:border-aldees-yellow/20 transition-all duration-300">
                <div className="w-14 h-14 bg-aldees-yellow/10 border border-aldees-yellow/30 flex items-center justify-center flex-shrink-0 group-hover:bg-aldees-yellow group-hover:border-aldees-yellow transition-all duration-300">
                  <Mail className="w-6 h-6 text-aldees-yellow group-hover:text-aldees-black transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-aldees-offwhite font-bold mb-1 text-lg">Email</h4>
                  <p className="text-aldees-offwhite/60">hello@aldees.com</p>
                </div>
              </div>

              <div className="contact-item flex items-start gap-5 group p-4 border border-transparent hover:border-aldees-yellow/20 transition-all duration-300">
                <div className="w-14 h-14 bg-aldees-yellow/10 border border-aldees-yellow/30 flex items-center justify-center flex-shrink-0 group-hover:bg-aldees-yellow group-hover:border-aldees-yellow transition-all duration-300">
                  <Clock className="w-6 h-6 text-aldees-yellow group-hover:text-aldees-black transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-aldees-offwhite font-bold mb-1 text-lg">Hours</h4>
                  <p className="text-aldees-offwhite/60">
                    Mon-Thu: 11am - 10pm
                    <br />
                    Fri-Sat: 11am - 11pm
                    <br />
                    Sun: 12pm - 9pm
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3
                className="text-xl font-bold text-aldees-offwhite mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Follow Us
              </h3>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-14 h-14 border border-aldees-yellow/30 flex items-center justify-center text-aldees-offwhite/60 hover:bg-aldees-yellow hover:text-aldees-black hover:border-aldees-yellow transition-all duration-300"
                    aria-label="Social link"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="relative h-72 overflow-hidden border border-aldees-yellow/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                className="w-full h-full grayscale contrast-125 opacity-70"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ALDEE'S Location"
              />
              <div className="absolute inset-0 bg-aldees-yellow/5 pointer-events-none" />
              <div className="absolute top-4 left-4 bg-aldees-black/80 backdrop-blur-sm px-4 py-2 border border-aldees-yellow/30">
                <span className="text-aldees-yellow text-sm font-bold tracking-wider">ALDEE'S</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
