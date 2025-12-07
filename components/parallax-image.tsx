"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
  scale?: number
}

export default function ParallaxImage({ src, alt, className = "", speed = 0.3, scale = 1.2 }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    const yPercent = speed * 100

    gsap.fromTo(
      imageRef.current,
      { yPercent: -yPercent / 2, scale },
      {
        yPercent: yPercent / 2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [speed, scale])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  )
}
