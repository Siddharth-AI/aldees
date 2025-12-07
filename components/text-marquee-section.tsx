"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function TextMarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-based horizontal movement
      gsap.to(line1Ref.current, {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(line2Ref.current, {
        xPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(line3Ref.current, {
        xPercent: -15,
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
    <section ref={sectionRef} className="relative py-24 bg-aldees-black overflow-hidden">
      {/* Line 1 */}
      <div ref={line1Ref} className="whitespace-nowrap mb-8" style={{ transform: "translateX(10%)" }}>
        <span
          className="text-[8vw] font-bold text-transparent tracking-tight"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            WebkitTextStroke: "1px rgba(255,229,0,0.3)",
          }}
        >
          FRESH INGREDIENTS • BOLD FLAVORS • UNFORGETTABLE TASTE • PREMIUM QUALITY •&nbsp;
        </span>
        <span
          className="text-[8vw] font-bold text-transparent tracking-tight"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            WebkitTextStroke: "1px rgba(255,229,0,0.3)",
          }}
        >
          FRESH INGREDIENTS • BOLD FLAVORS • UNFORGETTABLE TASTE • PREMIUM QUALITY •
        </span>
      </div>

      {/* Line 2 - Filled */}
      <div ref={line2Ref} className="whitespace-nowrap mb-8" style={{ transform: "translateX(-30%)" }}>
        <span
          className="text-[8vw] font-bold text-aldees-yellow tracking-tight"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ALDEE'S RESTAURANT CAFE • SINCE 2020 • BEST IN TOWN •&nbsp;
        </span>
        <span
          className="text-[8vw] font-bold text-aldees-yellow tracking-tight"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ALDEE'S RESTAURANT CAFE • SINCE 2020 • BEST IN TOWN •
        </span>
      </div>

      {/* Line 3 */}
      <div ref={line3Ref} className="whitespace-nowrap" style={{ transform: "translateX(5%)" }}>
        <span
          className="text-[8vw] font-bold text-transparent tracking-tight"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            WebkitTextStroke: "1px rgba(255,229,0,0.3)",
          }}
        >
          ORDER NOW • DINE IN • TAKE AWAY • DELIVERY • CATERING •&nbsp;
        </span>
        <span
          className="text-[8vw] font-bold text-transparent tracking-tight"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            WebkitTextStroke: "1px rgba(255,229,0,0.3)",
          }}
        >
          ORDER NOW • DINE IN • TAKE AWAY • DELIVERY • CATERING •
        </span>
      </div>
    </section>
  )
}
