"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const preloaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false)
        document.body.style.overflow = ""
      },
    })

    document.body.style.overflow = "hidden"

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { scale: 0, rotateY: -180, opacity: 0 },
      { scale: 1, rotateY: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
    )

    // Text reveal
    tl.fromTo(textRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.3")

    // Progress bar and counter
    tl.to(
      progressRef.current,
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: function () {
          if (counterRef.current) {
            const progress = Math.round(this.progress() * 100)
            counterRef.current.textContent = `${progress}%`
          }
        },
      },
      "-=0.5",
    )

    // Exit animation
    tl.to([logoRef.current, textRef.current, progressRef.current?.parentElement], {
      y: -50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.in",
    })

    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
    })

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  if (!isLoading) return null

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[100] bg-aldees-black flex flex-col items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] border border-aldees-yellow/10 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] border border-aldees-yellow/10 rounded-full" />
      </div>

      {/* Logo */}
      <div ref={logoRef} className="relative mb-8">
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 bg-aldees-yellow rounded-lg rotate-45 animate-pulse" />
          <div className="absolute inset-2 bg-aldees-black rounded-lg rotate-45" />
          <span
            className="absolute inset-0 flex items-center justify-center text-aldees-yellow font-bold text-4xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            A
          </span>
        </div>
        {/* Glow */}
        <div className="absolute inset-0 bg-aldees-yellow/20 blur-3xl" />
      </div>

      {/* Text */}
      <div ref={textRef} className="text-center mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold text-aldees-offwhite tracking-wider mb-2"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ALDEE'S
        </h1>
        <p className="text-aldees-yellow/60 text-sm tracking-[0.3em] uppercase">Premium Kitchen</p>
      </div>

      {/* Progress */}
      <div className="w-48 relative">
        <div className="h-[2px] bg-aldees-offwhite/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-aldees-yellow to-aldees-yellow/50 origin-left scale-x-0"
          />
        </div>
        <span
          ref={counterRef}
          className="absolute -right-12 top-1/2 -translate-y-1/2 text-aldees-yellow text-sm font-bold"
        >
          0%
        </span>
      </div>
    </div>
  )
}
