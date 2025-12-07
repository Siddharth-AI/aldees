"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      })
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      })
    }

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    window.addEventListener("mousemove", moveCursor)

    const interactiveElements = document.querySelectorAll("a, button, [data-cursor-hover]")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart)
      el.addEventListener("mouseleave", handleHoverEnd)
    })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart)
        el.removeEventListener("mouseleave", handleHoverEnd)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block transition-transform duration-300 ${
          isHovering ? "scale-150" : "scale-100"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
            isHovering ? "border-aldees-yellow bg-aldees-yellow/10" : "border-aldees-yellow/50"
          }`}
        />
      </div>
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-aldees-yellow rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
    </>
  )
}
