"use client"

import type React from "react"

import { useRef, type ReactNode } from "react"
import gsap from "gsap"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({ children, className = "", strength = 0.3 }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    gsap.to(buttonRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out",
    })

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        x: deltaX * 0.5,
        y: deltaY * 0.5,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    })

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }
  }

  return (
    <button ref={buttonRef} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <span ref={contentRef} className="block">
        {children}
      </span>
    </button>
  )
}
