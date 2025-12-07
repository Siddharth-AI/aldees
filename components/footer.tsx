"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
]

const footerLinks = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/#menu" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Careers", href: "#" },
  ],
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.to(bigTextRef.current, {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-aldees-black overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-transparent via-aldees-yellow to-transparent" />

      {/* Main Footer */}
      <div ref={contentRef} className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 relative">
                  <div className="absolute inset-0 bg-aldees-yellow rounded-lg rotate-45" />
                  <div className="absolute inset-1.5 bg-aldees-black rounded-lg rotate-45" />
                  <span
                    className="absolute inset-0 flex items-center justify-center text-aldees-yellow font-bold text-2xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    A
                  </span>
                </div>
              </div>
              <div>
                <span
                  className="text-3xl font-bold text-aldees-offwhite tracking-wider block"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  ALDEE'S
                </span>
                <span className="text-xs text-aldees-yellow/60 tracking-[0.3em] uppercase">Restaurant Cafe</span>
              </div>
            </div>

            <p className="text-aldees-offwhite/60 max-w-md mb-8 leading-relaxed">
              Bold flavors crafted with passion. Every dish tells a story of quality, tradition, and the relentless
              pursuit of culinary excellence.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group w-12 h-12 border border-aldees-yellow/20 flex items-center justify-center text-aldees-offwhite/60 hover:bg-aldees-yellow hover:text-aldees-black hover:border-aldees-yellow transition-all duration-300 relative overflow-hidden"
                >
                  <social.icon className="w-5 h-5 relative z-10" />
                  <span className="absolute inset-0 bg-aldees-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-aldees-yellow text-sm font-bold mb-6 tracking-[0.2em] uppercase">Navigation</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-aldees-offwhite/60 hover:text-aldees-yellow transition-colors duration-300"
                  >
                    <span className="w-0 h-[1px] bg-aldees-yellow group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-aldees-yellow text-sm font-bold mb-6 tracking-[0.2em] uppercase">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-aldees-offwhite/60 hover:text-aldees-yellow transition-colors duration-300"
                  >
                    <span className="w-0 h-[1px] bg-aldees-yellow group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-aldees-yellow text-sm font-bold mb-6 tracking-[0.2em] uppercase">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-aldees-offwhite/60">
                <MapPin className="w-5 h-5 text-aldees-yellow shrink-0 mt-0.5" />
                <span>123 Food Street, Flavor District, Mumbai 400001</span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-aldees-offwhite/60 hover:text-aldees-yellow transition-colors"
                >
                  <Phone className="w-5 h-5 text-aldees-yellow shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@aldees.com"
                  className="flex items-center gap-3 text-aldees-offwhite/60 hover:text-aldees-yellow transition-colors"
                >
                  <Mail className="w-5 h-5 text-aldees-yellow shrink-0" />
                  <span>hello@aldees.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-aldees-offwhite/60">
                <Clock className="w-5 h-5 text-aldees-yellow shrink-0" />
                <span>Open Daily: 11AM - 11PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-aldees-yellow/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3
                className="text-2xl font-bold text-aldees-offwhite mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Ready to experience bold flavors?
              </h3>
              <p className="text-aldees-offwhite/50">Order now or visit us today!</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-aldees-yellow text-aldees-black font-bold tracking-wider uppercase hover:bg-aldees-offwhite transition-colors duration-300"
              >
                Order Now
              </Link>
              <a
                href="tel:+919876543210"
                className="px-8 py-4 border border-aldees-yellow/30 text-aldees-yellow font-bold tracking-wider uppercase hover:bg-aldees-yellow hover:text-aldees-black transition-all duration-300"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-aldees-yellow/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-aldees-offwhite/40 text-sm">© 2025 ALDEE'S. All rights reserved.</p>
            <p className="text-aldees-offwhite/40 text-sm flex items-center gap-2">
              Made with <span className="text-red-500">♥</span> for flavor lovers
            </p>
          </div>
        </div>
      </div>

      <div
        ref={bigTextRef}
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
      >
        <div
          className="text-[20vw] font-bold text-aldees-yellow/[0.03] leading-none whitespace-nowrap translate-y-1/4"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ALDEE'S — FRESH PICKS — FLAVOR HITS —
        </div>
      </div>
    </footer>
  )
}
