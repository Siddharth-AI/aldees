"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface AldeesLogoProps {
  className?: string
  variant?: "yellow" | "black" | "white"
  animated?: boolean
}

export default function AldeesLogo({ className = "", variant = "yellow", animated = false }: AldeesLogoProps) {
  const logoRef = useRef<SVGSVGElement>(null)

  const colors = {
    yellow: "#FFE500",
    black: "#000000",
    white: "#F5F5F5",
  }

  const fillColor = colors[variant]

  useEffect(() => {
    if (animated && logoRef.current) {
      const letters = logoRef.current.querySelectorAll(".logo-letter")
      const line = logoRef.current.querySelector(".logo-line")

      gsap.fromTo(
        letters,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" },
      )

      gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.out", delay: 0.5 })
    }
  }, [animated])

  return (
    <svg ref={logoRef} viewBox="0 0 200 80" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* ALDEE'S Text Logo - Split into letters for animation */}
      <g style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif", fontSize: "48px", fontWeight: "bold" }}>
        <text x="20" y="55" fill={fillColor} className="logo-letter">
          A
        </text>
        <text x="45" y="55" fill={fillColor} className="logo-letter">
          L
        </text>
        <text x="67" y="55" fill={fillColor} className="logo-letter">
          D
        </text>
        <text x="95" y="55" fill={fillColor} className="logo-letter">
          E
        </text>
        <text x="118" y="55" fill={fillColor} className="logo-letter">
          E
        </text>
        <text x="141" y="55" fill={fillColor} className="logo-letter">
          '
        </text>
        <text x="152" y="55" fill={fillColor} className="logo-letter">
          S
        </text>
      </g>
      {/* Decorative line */}
      <line
        className="logo-line"
        x1="20"
        y1="68"
        x2="180"
        y2="68"
        stroke={fillColor}
        strokeWidth="3"
        style={{ transformOrigin: "left center" }}
      />
      {/* Subtle glow effect */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}
