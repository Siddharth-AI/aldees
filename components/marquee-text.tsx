"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface MarqueeTextProps {
  text: string
  className?: string
  speed?: number
  direction?: "left" | "right"
}

export default function MarqueeText({ text, className = "", speed = 30, direction = "left" }: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textWidth = textRef.current?.offsetWidth || 0
    const duration = textWidth / speed

    gsap.to(textRef.current, {
      x: direction === "left" ? -textWidth / 2 : textWidth / 2,
      duration,
      ease: "none",
      repeat: -1,
    })
  }, [speed, direction])

  const repeatedText = `${text} — `.repeat(10)

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        ref={textRef}
        className="inline-flex"
        style={{ transform: direction === "right" ? `translateX(-${50}%)` : "translateX(0)" }}
      >
        <span className="inline-block pr-4">{repeatedText}</span>
        <span className="inline-block pr-4">{repeatedText}</span>
      </div>
    </div>
  )
}
