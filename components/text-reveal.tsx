"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
  tag: Tag = "span",
}: TextRevealProps) {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    const text = element.innerText
    element.innerHTML = ""

    // Split text into words and characters
    const words = text.split(" ")
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span")
      wordSpan.style.display = "inline-block"
      wordSpan.style.overflow = "hidden"

      const chars = word.split("")
      chars.forEach((char) => {
        const charSpan = document.createElement("span")
        charSpan.className = "reveal-char"
        charSpan.style.display = "inline-block"
        charSpan.textContent = char
        wordSpan.appendChild(charSpan)
      })

      element.appendChild(wordSpan)

      // Add space between words
      if (wordIndex < words.length - 1) {
        const space = document.createElement("span")
        space.innerHTML = "&nbsp;"
        element.appendChild(space)
      }
    })

    const chars = element.querySelectorAll(".reveal-char")

    gsap.fromTo(
      chars,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [children, delay, stagger])

  return (
    <Tag ref={textRef as React.RefObject<HTMLElement>} className={className}>
      {children}
    </Tag>
  )
}
