"use client"

import type React from "react"

import { useRef, useState, type ReactNode } from "react"
import gsap from "gsap"

interface TiltCardProps {
  children: ReactNode
  className?: string
  tiltIntensity?: number
  glareEnabled?: boolean
}

export default function TiltCard({ children, className = "", tiltIntensity = 15, glareEnabled = true }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateX = (mouseY / (rect.height / 2)) * -tiltIntensity
    const rotateY = (mouseX / (rect.width / 2)) * tiltIntensity

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    })

    // Glare effect
    if (glareEnabled && glareRef.current) {
      const glareX = ((e.clientX - rect.left) / rect.width) * 100
      const glareY = ((e.clientY - rect.top) / rect.height) * 100
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,229,0,0.15) 0%, transparent 60%)`
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })
    }
    if (glareRef.current) {
      glareRef.current.style.background = "transparent"
    }
  }

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glareEnabled && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-inherit transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      )}
    </div>
  )
}
