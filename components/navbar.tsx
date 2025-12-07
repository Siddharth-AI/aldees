"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { Phone } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const menuBgRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initial load animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(
      logoRef.current,
      { y: -50, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power4.out" },
    )
      .fromTo(
        linksRef.current?.children || [],
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.5",
      )
      .fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" },
        "-=0.3",
      )
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"

      const tl = gsap.timeline()

      // Background reveal
      tl.fromTo(
        menuBgRef.current,
        { clipPath: "circle(0% at calc(100% - 40px) 40px)" },
        { clipPath: "circle(150% at calc(100% - 40px) 40px)", duration: 0.8, ease: "power4.inOut" },
      )

      // Menu items stagger
      tl.fromTo(
        menuItemsRef.current,
        { x: 100, opacity: 0, rotateY: -45 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.3",
      )
    } else {
      document.body.style.overflow = ""

      if (menuBgRef.current) {
        gsap.to(menuBgRef.current, {
          clipPath: "circle(0% at calc(100% - 40px) 40px)",
          duration: 0.5,
          ease: "power4.inOut",
        })
      }
    }
  }, [isOpen])

  // Link hover animation
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    const link = e.currentTarget
    const underline = link.querySelector(".nav-underline")
    const text = link.querySelector(".nav-text")

    if (enter) {
      gsap.to(underline, { scaleX: 1, duration: 0.4, ease: "power2.out" })
      gsap.to(text, { y: -2, duration: 0.3, ease: "power2.out" })
    } else {
      gsap.to(underline, { scaleX: 0, duration: 0.4, ease: "power2.in" })
      gsap.to(text, { y: 0, duration: 0.3, ease: "power2.in" })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "py-3 bg-aldees-black/90 backdrop-blur-xl border-b border-aldees-yellow/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div ref={logoRef} className="relative z-10">
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative">
                  {/* Logo Icon */}
                  <div className="w-12 h-12 relative">
                    <div className="absolute inset-0 bg-aldees-yellow rounded-sm rotate-45 group-hover:rotate-[405deg] transition-transform duration-700" />
                    <div className="absolute inset-1 bg-aldees-black rounded-sm rotate-45" />
                    <span
                      className="absolute inset-0 flex items-center justify-center text-aldees-yellow font-bold text-xl"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      A
                    </span>
                  </div>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-aldees-yellow/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="hidden sm:block">
                  <span
                    className="text-2xl font-bold text-aldees-offwhite tracking-wider group-hover:text-aldees-yellow transition-colors duration-300"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    ALDEE'S
                  </span>
                  <span className="block text-[10px] text-aldees-yellow/60 tracking-[0.3em] uppercase">
                    Restaurant Cafe
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div ref={linksRef} className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                  className={`relative px-6 py-3 group ${
                    pathname === link.href ? "text-aldees-yellow" : "text-aldees-offwhite/80"
                  }`}
                >
                  <span className="nav-text relative z-10 text-sm tracking-[0.2em] uppercase font-medium inline-block">
                    {link.label}
                  </span>
                  {/* Animated underline */}
                  <span
                    className={`nav-underline absolute bottom-2 left-6 right-6 h-[2px] bg-gradient-to-r from-aldees-yellow via-aldees-yellow to-transparent origin-left ${
                      pathname === link.href ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                  {/* Background glow on hover */}
                  <span className="absolute inset-0 bg-aldees-yellow/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div ref={ctaRef} className="hidden lg:flex items-center gap-4">
              {/* Phone number */}
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-aldees-offwhite/60 hover:text-aldees-yellow transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm tracking-wider">+91 98765 43210</span>
              </a>

              {/* Order Now Button with magnetic effect */}
              <Link href="/contact" className="relative group overflow-hidden">
                <span className="relative z-10 flex items-center gap-2 px-8 py-3.5 bg-aldees-yellow text-aldees-black text-sm tracking-[0.15em] uppercase font-bold transition-all duration-500 group-hover:text-aldees-black">
                  <span>Order Now</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* Glow */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(255,229,0,0.5)]" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-50 w-14 h-14 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-7 h-5">
                <span
                  className={`absolute left-0 w-full h-0.5 bg-aldees-yellow transform transition-all duration-500 ease-out ${
                    isOpen ? "top-2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 w-full h-0.5 bg-aldees-yellow transition-all duration-300 ${
                    isOpen ? "opacity-0 translate-x-4" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-0.5 bg-aldees-yellow transform transition-all duration-500 ease-out ${
                    isOpen ? "top-2 -rotate-45" : "top-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen */}
      <div
        ref={menuBgRef}
        className={`fixed inset-0 z-40 lg:hidden bg-aldees-black ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 border border-aldees-yellow rounded-full" />
          <div className="absolute bottom-20 right-10 w-96 h-96 border border-aldees-yellow rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-aldees-yellow/50 rounded-full" />
        </div>

        <div className="flex flex-col items-center justify-center h-full px-8">
          {/* Navigation Links */}
          <nav className="flex flex-col items-center gap-8 mb-12">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  menuItemsRef.current[i] = el
                }}
                onClick={() => setIsOpen(false)}
                className={`relative group ${pathname === link.href ? "text-aldees-yellow" : "text-aldees-offwhite"}`}
              >
                <span
                  className="text-5xl sm:text-6xl font-bold tracking-wider uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {link.label}
                </span>
                {/* Underline */}
                <span
                  className={`absolute -bottom-2 left-0 h-1 bg-aldees-yellow transition-all duration-500 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
                {/* Number */}
                <span className="absolute -left-8 top-0 text-sm text-aldees-yellow/40">0{i + 1}</span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/contact"
            ref={(el) => {
              menuItemsRef.current[navLinks.length] = el
            }}
            onClick={() => setIsOpen(false)}
            className="px-12 py-5 bg-aldees-yellow text-aldees-black text-lg tracking-[0.15em] uppercase font-bold"
          >
            Order Now
          </Link>

          {/* Contact Info */}
          <div
            ref={(el) => {
              menuItemsRef.current[navLinks.length + 1] = el as HTMLAnchorElement
            }}
            className="mt-16 text-center"
          >
            <p className="text-aldees-offwhite/40 text-sm tracking-[0.2em] uppercase mb-2">Call Us</p>
            <a href="tel:+919876543210" className="text-2xl text-aldees-yellow font-bold">
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
