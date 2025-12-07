"use client"

import { useEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Enable smooth scroll behavior with better performance
    document.documentElement.style.scrollBehavior = "smooth"

    // Configure ScrollTrigger for better performance
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    })

    // Refresh ScrollTrigger after fonts and images load
    const refreshTrigger = () => {
      ScrollTrigger.refresh()
    }

    // Debounced resize handler for performance
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(refreshTrigger, 200)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("load", refreshTrigger)

    // Initial refresh after a short delay
    const initialRefresh = setTimeout(refreshTrigger, 100)

    return () => {
      clearTimeout(initialRefresh)
      clearTimeout(resizeTimeout)
      document.documentElement.style.scrollBehavior = "auto"
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("load", refreshTrigger)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="will-change-scroll">
      {children}
    </div>
  )
}
