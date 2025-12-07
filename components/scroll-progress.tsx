"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })

      gsap.to(thumbRef.current, {
        top: "calc(100% - 60px)",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      {/* Track */}
      <div className="w-[2px] h-40 bg-aldees-offwhite/10 rounded-full relative overflow-hidden">
        {/* Progress fill */}
        <div
          ref={progressRef}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-aldees-yellow to-aldees-yellow/50 origin-top scale-y-0"
        />
      </div>

      {/* Thumb indicator */}
      <div ref={thumbRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4">
        <div className="w-full h-full bg-aldees-yellow rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-aldees-yellow/50 rounded-full blur-md" />
      </div>
    </div>
  )
}
