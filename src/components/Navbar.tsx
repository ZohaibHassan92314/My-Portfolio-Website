"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const navLinks = [
  { href: "#about",      label: "About",    key: "about" },
  { href: "#experience", label: "Skills",   key: "experience" },
  { href: "#projects",   label: "Projects", key: "projects" },
  { href: "#contact",    label: "Contact",  key: "contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState("")
  const [menuOpen, setMenuOpen]   = useState(false)
  const [progress, setProgress]   = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docH     = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docH > 0 ? (scrollTop / docH) * 100 : 0)
      setScrolled(scrollTop > 40)

      const mid = scrollTop + window.innerHeight * 0.4
      let cur = ""
      for (const { key } of navLinks) {
        const el = document.getElementById(key)
        if (el && el.offsetTop <= mid) cur = key
      }
      setActive(cur)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target) return
    const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <>
      {/* Scroll progress */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 h-[2px] z-[99998] pointer-events-none transition-all duration-75"
        style={{ background: "linear-gradient(90deg,#00d4ff,#7c3aed)", width: `${progress}%` }}
      />

      {/* Desktop nav */}
      <nav
        id="desktop-nav"
        aria-label="Main navigation"
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[1000] hidden md:flex items-center gap-8 px-5 py-2.5 rounded-full border transition-all duration-300
          ${scrolled
            ? "border-[rgba(0,212,255,0.12)] shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,212,255,0.06)]"
            : "border-[rgba(255,255,255,0.07)] shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
          }
          bg-[rgba(10,12,22,0.82)] backdrop-blur-xl`}
      >
        <a
          href="#profile"
          onClick={(e) => smoothScroll(e, "#profile")}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.07)] text-sm font-black text-white bg-gradient-to-br from-[rgba(0,212,255,0.15)] to-[rgba(124,58,237,0.1)] hover:border-[#00d4ff] hover:shadow-[0_0_16px_rgba(0,212,255,0.22)] transition-all no-underline"
        >
          ZH
        </a>
        <ul className="flex gap-1 list-none m-0 p-0">
          {navLinks.map(({ href, label, key }) => (
            <li key={key}>
              <a
                href={href}
                onClick={(e) => smoothScroll(e, href)}
                className={`text-[0.8rem] font-medium px-3.5 py-1.5 rounded-full transition-all no-underline
                  ${active === key
                    ? "text-[#00d4ff] bg-[rgba(255,255,255,0.07)]"
                    : "text-[#6b7a99] hover:text-white hover:bg-[rgba(255,255,255,0.07)]"
                  }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/assets/Muhammad Zohaib Hassan Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.78rem] font-semibold text-[#00d4ff] border border-[rgba(0,212,255,0.3)] px-3.5 py-1.5 rounded-full hover:bg-[rgba(0,212,255,0.08)] hover:shadow-[0_0_16px_rgba(0,212,255,0.22)] transition-all no-underline"
        >
          Resume ↗
        </a>
      </nav>

      {/* Mobile hamburger */}
      <nav
        id="hamburger-nav"
        aria-label="Mobile navigation"
        className="md:hidden fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center h-[60px] px-5 bg-[rgba(7,8,16,0.92)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.07)]"
      >
        <a
          href="#profile"
          onClick={(e) => smoothScroll(e, "#profile")}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.07)] text-sm font-black text-white no-underline"
        >
          ZH
        </a>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex flex-col justify-between h-[18px] w-6 p-0 bg-transparent border-none cursor-pointer"
          >
            <span className={`block w-full h-[1.5px] bg-[#dde4f0] rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-full h-[1.5px] bg-[#dde4f0] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-full h-[1.5px] bg-[#dde4f0] rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
          <div
            className={`absolute top-[calc(100%+12px)] right-0 min-w-[200px] bg-[#0f1220] border border-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden transition-all duration-300
              ${menuOpen ? "max-h-[400px] opacity-100 shadow-[0_16px_48px_rgba(0,0,0,0.7)]" : "max-h-0 opacity-0"}`}
          >
            {navLinks.map(({ href, label, key }, i) => (
              <a
                key={key}
                href={href}
                onClick={(e) => smoothScroll(e, href)}
                className={`block px-6 py-3.5 text-[0.95rem] font-medium text-[#6b7a99] hover:text-white hover:bg-[rgba(0,212,255,0.08)] no-underline transition-all
                  ${i < navLinks.length - 1 ? "border-b border-[rgba(255,255,255,0.07)]" : ""}`}
              >
                {label}
              </a>
            ))}
            <a
              href="/assets/Muhammad Zohaib Hassan Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-3.5 text-[0.95rem] font-medium text-[#6b7a99] hover:text-white hover:bg-[rgba(0,212,255,0.08)] no-underline transition-all"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
