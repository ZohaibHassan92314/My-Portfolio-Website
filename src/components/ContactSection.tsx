"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function ContactSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal")
    if (!els) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1)
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0,212,255,0.07) 0%, #0f1220 60%)`
  }

  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.background = ""
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 px-[clamp(1.25rem,9vw,7rem)] overflow-hidden flex flex-col items-center justify-center min-h-[70svh]"
    >
      <div className="section-bg-text">HELLO</div>

      <div className="text-center mb-8 relative z-10">
        <p className="reveal block text-[0.72rem] font-bold tracking-[0.2em] uppercase text-[#00d4ff] mb-2">
          Get in Touch
        </p>
        <h2 className="reveal text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.035em] text-white leading-[1.1]">
          Contact Me
        </h2>
      </div>

      <p className="reveal text-[clamp(1rem,2vw,1.3rem)] text-[#6b7a99] text-center mb-10 relative z-10 font-normal">
        Let&apos;s build something remarkable together.
      </p>

      {/* Contact card */}
      <div
        ref={cardRef}
        className="reveal reveal-delay-3 relative z-10 flex flex-wrap items-center w-full max-w-lg border border-[rgba(255,255,255,0.07)] rounded-[1.25rem] bg-[#0f1220] px-8 py-5 hover:border-[rgba(0,212,255,0.28)] hover:shadow-[0_0_40px_rgba(0,212,255,0.22)] transition-all"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* Email */}
        <div className="flex items-center gap-3 flex-1 min-w-[200px] py-3 px-5">
          <Image src="/assets/email.png" alt="Email" width={22} height={22} className="opacity-55" />
          <a
            href="mailto:zohaiblatif29@gmail.com"
            className="text-[0.9rem] font-medium text-[#6b7a99] hover:text-[#00d4ff] transition-colors no-underline"
          >
            zohaiblatif29@gmail.com
          </a>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-[rgba(255,255,255,0.07)] flex-shrink-0" />

        {/* LinkedIn */}
        <div className="flex items-center gap-3 flex-1 min-w-[200px] py-3 px-5">
          <Image src="/assets/linkedin.png" alt="LinkedIn" width={22} height={22} className="opacity-55" />
          <a
            href="https://www.linkedin.com/in/zohaibhassan07/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.9rem] font-medium text-[#6b7a99] hover:text-[#00d4ff] transition-colors no-underline"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  )
}
