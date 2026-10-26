"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const projects = [
  {
    num: "01",
    title: "Pak Wheels Analysis",
    desc: "Pak Wheels used-car market exploration — EDA & interactive analytics dashboard.",
    tech: ["Python", "Streamlit", "EDA"],
    github: "https://github.com/ZohaibHassan92314/used-cars-analysis",
    demo:   "https://used-cars-analysis-7lpd2en6z3ybgmvwjcropx.streamlit.app/#pak-wheels-used-cars-dashboard",
    img:    "/assets/pic1.png",
    alt:    "Pak Wheels Used Cars Dashboard screenshot",
    githubId: "proj1-github",
    demoId:   "proj1-demo",
  },
  {
    num: "02",
    title: "Hospital Beds Analysis",
    desc: "Hospital beds system capacity analysis — EDA & healthcare data insights.",
    tech: ["Python", "Streamlit", "Healthcare Data"],
    github: "https://github.com/ZohaibHassan92314/Hospital-Beds-System-Analysis-EDA-",
    demo:   "https://nwmgzhiag9qdfbwuduja48.streamlit.app/",
    img:    "/assets/pic2.png",
    alt:    "Hospital Beds System Analysis screenshot",
    githubId: "proj2-github",
    demoId:   "proj2-demo",
  },
  {
    num: "03",
    title: "Banggood Analytics",
    desc: "Banggood e-commerce analytics — market intelligence & trend visualisation.",
    tech: ["Python", "Streamlit", "Market Analytics"],
    github: "https://github.com/ZohaibHassan92314/BanggoodAnalysis/tree/master",
    demo:   "https://banggoodanalysis-6z9tj6ygimruhiqm2df2k6.streamlit.app/",
    img:    "/assets/pic3.png",
    alt:    "Banggood Analysis screenshot",
    githubId: "proj3-github",
    demoId:   "proj3-demo",
  },
]

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal")
    if (!els) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target) }
      })
    }, { threshold: 0.1, rootMargin: "0px 0px -48px 0px" })
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-28 px-[clamp(1.25rem,9vw,7rem)] overflow-hidden flex flex-col items-center"
    >
      <div className="section-bg-text">WORK</div>

      <div className="text-center mb-16 relative z-10">
        <p className="reveal block text-[0.72rem] font-bold tracking-[0.2em] uppercase text-[#00d4ff] mb-2">
          Browse My Recent
        </p>
        <h2 className="reveal text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.035em] text-white leading-[1.1]">
          Projects
        </h2>
      </div>

      {/* Editorial project rows */}
      <div className="relative z-10 w-full max-w-4xl border-t border-[rgba(255,255,255,0.07)]">
        {projects.map((p, i) => (
          <div
            key={p.num}
            className={`reveal ${i > 0 ? `reveal-delay-${i}` : ""} group relative flex items-center gap-8 py-10 px-4 border-b border-[rgba(255,255,255,0.07)] transition-all duration-300 hover:bg-[rgba(0,212,255,0.025)] cursor-default`}
            onMouseEnter={() => setHovered(p.num)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Accent border */}
            <div className={`absolute left-0 top-0 bottom-0 w-0 bg-[#00d4ff] rounded-r-sm transition-all duration-500 ${hovered === p.num ? "w-[3px]" : ""}`} />

            {/* Number */}
            <div
              className="text-[clamp(3rem,7vw,6rem)] font-black tracking-[-0.05em] leading-none select-none min-w-[5rem] text-center transition-all duration-300"
              style={{
                color: "transparent",
                WebkitTextStroke: hovered === p.num ? "1px rgba(0,212,255,0.4)" : "1px #2e3650",
              }}
              aria-hidden="true"
            >
              {p.num}
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              <h3 className="text-[clamp(1.1rem,2.5vw,1.6rem)] font-bold text-white tracking-[-0.02em]">
                {p.title}
              </h3>
              <p className="text-[0.875rem] text-[#6b7a99] leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#00d4ff] px-2 py-0.5 border border-[rgba(0,212,255,0.2)] rounded-full bg-[rgba(0,212,255,0.08)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <a
                  id={p.githubId}
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.75rem] font-semibold px-4 py-2 rounded-full border border-[rgba(255,255,255,0.07)] text-[#dde4f0] hover:border-[#00d4ff] hover:text-[#00d4ff] hover:bg-[rgba(0,212,255,0.08)] hover:-translate-y-0.5 transition-all no-underline"
                >
                  Github ↗
                </a>
                <a
                  id={p.demoId}
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.75rem] font-semibold px-4 py-2 rounded-full border border-[rgba(255,255,255,0.07)] text-[#dde4f0] hover:border-[#00d4ff] hover:text-[#00d4ff] hover:bg-[rgba(0,212,255,0.08)] hover:-translate-y-0.5 transition-all no-underline"
                >
                  Live Demo ↗
                </a>
              </div>
            </div>

            {/* Hover image reveal */}
            <div
              className={`hidden lg:block flex-shrink-0 w-[260px] h-[165px] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)] transition-all duration-500
                ${hovered === p.num ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-6 scale-95"}`}
            >
              <Image
                src={p.img}
                alt={p.alt}
                width={260}
                height={165}
                className={`w-full h-full object-cover transition-transform duration-500 ${hovered === p.num ? "scale-[1.05]" : "scale-100"}`}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 relative z-10">
        <a href="#contact" className="inline-block opacity-30 hover:opacity-70 transition-opacity animate-bounce">
          <Image src="/assets/arrow.png" alt="Scroll to Contact" width={32} height={32} className="opacity-60" />
        </a>
      </div>
    </section>
  )
}
